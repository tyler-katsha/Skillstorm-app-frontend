import styles from '../../module/Leaderboard.module.css';
import { Skeleton } from './Skeleton';

export const LeaderboardRowSkeleton = () => {

    return (
        <div className={styles.item}>
            <div className={styles.userInfo}>
                <span className={styles.rank}><Skeleton width='70%' height='25px'/></span>
                <span className={styles.username}>{"\u00A0".repeat(50)}<Skeleton/></span>
            </div>
            <Skeleton width='100px' height='33px' borderRadius='999px'/>
        </div>
    )
}