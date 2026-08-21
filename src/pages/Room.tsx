import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../module/Room.module.css';
import { useUser } from '../contexts/UserContext';
import { PlayerCard } from '../components/PlayerCard';
import type { PlayerSlot } from '../utils/type';
import type { Client } from '@stomp/stompjs';
import { createStompClient } from '../utils/websocket';
import { getToken } from '../utils/Utils';

export const Room = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser();

    const state = location.state as { roomId?: string; isHost?: boolean } | null;
    const roomId = state?.roomId;
    const isRoomHost = state?.isHost ?? false;

    // Initialize the current user's card locally right away
    const [hostPlayer, setHostPlayer] = useState<PlayerSlot | null>(() => {
        if (isRoomHost && user) {
            return {
                username: user.username,
                isHost: true,
                isReady: false,
                quizzesTaken: 0,
                quizzesWon: 0,
                streak: 0,
            };
        }
        return null;
    });

    const [opponent, setOpponent] = useState<PlayerSlot | null>(() => {
        if (!isRoomHost && user) {
            return {
                username: user.username,
                isHost: false,
                isReady: false,
                quizzesTaken: 0,
                quizzesWon: 0,
                streak: 0,
            };
        }
        return null;
    });

    const [isReady, setIsReady] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const stompClient = useRef<Client | null>(null);

    const handleCopyRoomCode = () => {
        if (!roomId) return;

        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const handleTogglePrivacy = () => {
        if (!isRoomHost) return;

        const updatedVisibility = !isPublic;
        setIsPublic(updatedVisibility);

        if (stompClient.current && isConnected) {
            stompClient.current.publish({
                destination: `/app/duel/${roomId}/visibility`,
                body: JSON.stringify({ isPublic: updatedVisibility })
            });
        }
    };

    useEffect(() => {
        if (!roomId || !user) {
            navigate('/profile', { replace: true });
            return;
        }

        const token = getToken();

        if (!token) {
            throw new Error('No Token Found');
        }

        const client = createStompClient(() => {
            setIsConnected(true);

            const data = {
                quizzesTaken: (user as any).quizzesTaken ?? 0,
                quizzesWon: (user as any).quizzesWon ?? 0,
                streak: (user as any).streak ?? 0,
            };

            // Subscribe to room topic
            client.subscribe(`/topic/duel/${roomId}`, (message) => {
                const incomingPlayer: PlayerSlot = JSON.parse(message.body);

                // Disregard our own reflection broadcast
                if (incomingPlayer.username === user.username) {
                    if (isRoomHost) setHostPlayer((prev) => ({ ...prev, ...incomingPlayer }));
                    else setOpponent((prev) => ({ ...prev, ...incomingPlayer }));
                    return;
                }

                // Assign the other player into their corresponding slot
                if (incomingPlayer.isHost) {
                    setHostPlayer(incomingPlayer);
                } else {
                    setOpponent(incomingPlayer);
                }

                if (isRoomHost && incomingPlayer.action === 'JOIN') {
                    stompClient.current?.publish({
                        destination: `/app/duel/${roomId}/action`,
                        body: JSON.stringify({
                            action: 'SYNC',
                            username: user.username,
                            isHost: true,
                            isReady: hostPlayer?.isReady ?? false,
                            score: user.xp,
                            currentQuestionIndex: 0,
                            quizzesTaken: data.quizzesTaken,
                            quizzesWon: data.quizzesWon,
                            streak: data.streak,
                        })
                    })
                }
            });

            // Announce presence with your actual unique username
            client.publish({
                destination: `/app/duel/${roomId}/action`,
                body: JSON.stringify({
                    action: 'JOIN',
                    username: user.username,
                    isHost: isRoomHost,
                    isReady: false,
                    score: 0,
                    currentQuestionIndex: 0,
                    quizzesTaken: data.quizzesTaken,
                    quizzesWon: data.quizzesWon,
                    streak: data.streak,
                }),
            });
        }, () => {
            setIsConnected(false);
        }, token);

        client.activate();
        stompClient.current = client;

        return () => {
            if (client.active) client.deactivate();
        };
    }, [roomId, isRoomHost, user, navigate]);

    const handleToggleReady = () => {
        if (!stompClient.current?.connected || !roomId || !user) return;

        const nextReady = !isReady;
        setIsReady(nextReady);

        if(isRoomHost){
            setHostPlayer((prev) => prev ? {...prev, isReady: nextReady} : null);
        } else{ 
            setHostPlayer((prev) => prev ? {...prev, isReady: nextReady} : null);
        }

        stompClient.current.publish({
            destination: `/app/duel/${roomId}/${nextReady ? 'ready' : 'unready'}`,
            body: JSON.stringify({
                username: user.username,
                isHost: isRoomHost,
                isReady: nextReady,
                score: 0,
                currentQuestionIndex: 0,
            }),
        });
    };

    return (
        <div className={styles.roomPageWrapper}>
            <div className={styles.roomHeader}>
                <h1 className={styles.roomTitle}>Duel Lobby</h1>

                <div className={styles.roomCodeContainer} onClick={handleCopyRoomCode} title="Click to copy code">
                    <span className={styles.roomCodeLabel}>Room ID:</span>
                    <span className={styles.roomCodeValue}>{roomId}</span>
                    <button type="button" className={styles.copyBtn}>
                        {copied ? 'Copied! ✓' : 'Copy'}
                    </button>
                </div>

                <div className={styles.privacyContainer}>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isPublic}
                        disabled={!isRoomHost}
                        onClick={handleTogglePrivacy}
                        className={`${styles.privacyToggle} ${isPublic ? styles.public : styles.private} ${!isRoomHost ? styles.disabled : ''}`}
                        title={isRoomHost ? `Click to make room ${isPublic ? 'Private' : 'Public'}` : `Room is ${isPublic ? 'Public' : 'Private'}`}
                    >
                        <span className={styles.toggleThumb} />
                        <span className={styles.privacyLabel}>
                            {isPublic ? 'Public Room' : 'Private Room'}
                        </span>
                    </button>
                </div>

                <div className={`${styles.statusContainer} ${isConnected ? styles.connected : styles.disconnected}`} title={isConnected ? 'Connected to lobby' : 'Disconnected / Reconnecting...'}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusLabel}>
                        {isConnected ? 'Connected' : 'Offline'}
                    </span>
                </div>
            </div>

            <div className={styles.duelContainer}>
                <PlayerCard
                    player={hostPlayer}
                    isHost={true}
                    isCurrentUser={isRoomHost}
                    isReady={isRoomHost ? isReady : (hostPlayer?.isReady ?? false)}
                    onToggleReady={handleToggleReady}
                    placeholderText="Waiting for host..."
                />

                <div className={styles.vsDivider}>VS</div>

                <PlayerCard
                    player={opponent}
                    isHost={false}
                    isCurrentUser={!isRoomHost}
                    isReady={!isRoomHost ? isReady : (opponent?.isReady ?? false)}
                    onToggleReady={handleToggleReady}
                    placeholderText="Waiting for opponent..."
                />
            </div>


        </div>
    );
};