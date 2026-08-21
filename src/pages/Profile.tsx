// profile page
import { useNavigate } from 'react-router-dom';
import { BadgeCard } from '../components/BadgeCard';
import { Profile } from '../components/ProfileImageHolder';
import { useUser } from '../contexts/UserContext';
import styles from '../module/ProfilePage.module.css';
import { challengeData, statsData } from '../utils/MockData';
import { getYear } from '../utils/Utils';
import { createRoom, friendJoinRoom, quickJoinRoom } from '../utils/services/RoomApi';
import { useState } from 'react';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const [roomId,setRoomId] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    if (!user) {
        return;
    }

    const handleHostRoom = async () => {
        try {
            setErrorMsg(null);
            const response = await createRoom();
            const createdRoomId = response.roomId;
            navigate(`/room`, { state: { roomId:createdRoomId,isHost: true, isPublic:true } });
        } catch (error) {
            console.error("Failed to host room", error);
            setErrorMsg('Failed to create room. Please try again.');
        }
    };

    const handleQuickJoinRoom = async () => {
        try {
            setErrorMsg(null);
            const room = await quickJoinRoom();
            
            const roomId = room.roomId;

            if(room.roomId){
                // Match found
                navigate(`/room`, { state: { roomId, isHost: false, isPublic: true } });
            }
        } catch (error) {
            console.error('Failed to quick join room', error);
            setErrorMsg('Quick match failed. Try again.');
        }
    }

    const handleFriendJoinRoom = async () => {
        const trimmedRoomId = roomId.trim();
        if(!trimmedRoomId) return;
        try {
            setErrorMsg(null);
            const room = await friendJoinRoom(trimmedRoomId);
            const targetRoomId = room.roomId || trimmedRoomId;
            navigate(`/room`, { state: { roomId:targetRoomId, isHost: false, isPublic: false } })
            
        } catch (error) {
            console.error('Failed to quick join room', error);
            setErrorMsg('Room not found or code is invalid.');
        }
    }
    return (
        <div className={styles.pageWrapper}>

            <h1 className={styles.title}>
                My Profile
            </h1>

            <p className={styles.titleDescription}>
                SkillStorm - compete, earn badges, track progress
            </p>

            {errorMsg && <p className={styles.errorMessage} style={{ color: '#ef4444' }}>{errorMsg}</p>}

            <div className={styles.profileContainer}>
                <div className={styles.leftContainer}>

                    <Profile name={user.username} profileImageUrl={undefined} />

                    <div className={styles.statsGrid}>
                        <div className={styles.statsCard}>{statsData.quizzesTaken} Quizzes</div>
                        <div className={styles.statsCard}>{statsData.quizzesWon} Won</div>
                        <div className={styles.statsCard}>{statsData.streak} Streak</div>
                    </div>

                    // could add game history

                    // like Duel's played

                    // Duel's Won

                    // Duel's lost

                    // Duel's Drawn

                    //

                    <div className={styles.userData}>
                        <h3>Email: {user.email}</h3>
                        <h3>Join {getYear(user.createdAt)}</h3>
                    </div>


                </div>

                <div className={styles.rightContainer}>
                    <div className={styles.statsCardData}>
                        <h2>Badges</h2>
                        <hr className={styles.divider} />

                        {user.badges !== undefined && user.badges.length > 0 ?
                            (user.badges.map((item, index) => (
                                <BadgeCard key={index} name={item.name} description={item.description} />
                            ))) : (
                                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '1.2rem', color: '#64748B', alignItems: 'center' }}>No Badges Obtained</div>
                            )}
                    </div>

                    <div className={styles.statsCardData}>
                        <h2>Ranking</h2>
                        <hr className={styles.divider} />

                        <p className={styles.ranking}>#8 Global</p>
                        <p className={styles.points}>{user.xp} pts</p>
                        <p className={styles.winRate}>{((statsData.quizzesWon / statsData.quizzesTaken) * 100).toFixed(2)}% win rate</p>
                    </div>

                    <div className={styles.statsCardData}>
                        <h2>Challenges</h2>
                        <hr className={styles.divider} />

                        <div className={styles.quizRowsContainer}>
                            {challengeData.map((item, index) => (
                                <div key={index} className={styles.bubbleChallenge}>
                                    <p>
                                        {item.topic} - {item.percent}
                                        <button className={styles.resumeBtn}>Resume</button>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className={styles.pvpContainer}>

                            <div className={styles.quickJoinContainer}>
                                <button className={styles.quickJoinBtn} onClick={handleQuickJoinRoom}>Quick Join</button>
                            </div>

                            <div className={styles.hostContainer}>

                                <p className={styles.hostRoom}>Host a Room</p>

                                <button className={styles.hostBtn} onClick={handleHostRoom}>Host</button>
                            </div>

                            <div className={styles.friendJoinContainer}>

                                <p className={styles.friendRoom}>Join a Room</p>

                                <input type='text' placeholder='Enter Room ID' value={roomId} className={styles.joinInput} onChange={(e) => setRoomId(e.target.value)}/>
                                <button className={styles.hostBtn} onClick={handleFriendJoinRoom}>Join</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <p className={styles.bottomDescription}>SkillStorm - Compete, Earn, Conquer</p>
        </div>
    )
}