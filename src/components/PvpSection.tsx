import { useState } from "react";
import styles from '../module/ProfilePage.module.css';
import { createRoom, friendJoinRoom, quickJoinRoom } from '../utils/services/RoomApi';
import { useNavigate } from "react-router-dom";
export const PvpSection = () => {

    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleHostRoom = async () => {
        try {
            setErrorMsg(null);
            const response = await createRoom();
            const createdRoomId = response.roomId;
            navigate(`/room`, { state: { roomId: createdRoomId, isHost: true, isPublic: true } });
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

            if (room.roomId) {
                navigate(`/room`, { state: { roomId, isHost: false, isPublic: true } });
            }
        } catch (error) {
            console.error('Failed to quick join room', error);
            setErrorMsg('Quick match failed. Try again.');
        }
    }

    const handleFriendJoinRoom = async () => {
        const trimmedRoomId = roomId.trim();
        if (!trimmedRoomId) return;
        try {
            setErrorMsg(null);
            const room = await friendJoinRoom(trimmedRoomId);
            const targetRoomId = room.roomId || trimmedRoomId;
            navigate(`/room`, { state: { roomId: targetRoomId, isHost: false, isPublic: false } })

        } catch (error) {
            console.error('Failed to quick join room', error);
            setErrorMsg('Room not found or code is invalid.');
        }
    }
    return (
        <>
            {errorMsg && <p className={styles.errorMessage} style={{ color: '#ef4444' }}>{errorMsg}</p>}

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

                    <input type='text' placeholder='Enter Room ID' value={roomId} className={styles.joinInput} onChange={(e) => setRoomId(e.target.value)} />
                    <button className={styles.hostBtn} onClick={handleFriendJoinRoom}>Join</button>
                </div>


            </div>
        </>

    )
}