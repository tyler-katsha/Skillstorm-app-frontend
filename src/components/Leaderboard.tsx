import styles from '../module/Leaderboard.module.css';
import type { LeaderboardProps } from "../utils/type";

export const Leaderboard: React.FC<LeaderboardProps> = ({ title, users,isLoading,limit = 10,isBackground}) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', backgroundColor: isBackground ? '#fcf8ec' : '', minHeight: '100vh' }}>
            <div className={styles.card}>
                <h2 className={styles.title}>{title}</h2>

                <div className={styles.list}>
                    {users.length !== 0 ? ( users.slice(0,limit).map((user) => (
                        <div key={user.rank} className={styles.item}>
                            <div className={styles.userInfo}>
                                <span className={styles.rank}>#{user.rank}</span>
                                <span className={styles.username}>{user.username}</span>
                            </div>
                            <div className={styles.badge}>
                                {user.points.toLocaleString()} points - Level {user.level}
                            </div>
                        </div>
                    ))) : (
                        <div style={{display:'flex',justifyContent:'center',fontSize:'1.2rem',color:'#64748B',alignItems:'center'}}>{isLoading ? "Fetching...." : "No Leading Users"}</div>
                    )}
                </div>
            </div>
        </div>
    )
}