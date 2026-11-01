import styles from '../../module/ProfilePage.module.css';
import { Skeleton } from './Skeleton';

export const QuizProfileAttemptSkeleton = () => {

    return (
        <div className={styles.attemptRow}>
            <div className={styles.attemptInfo}>
                <Skeleton />
                {'\u00A0'.repeat(20)}
                <Skeleton height='30px'/>
            </div>
            <span
                className={`${styles.attemptStatus} ${true ? styles.statusPerfect : false ? styles.statusWon : styles.statusLost
                    }`}
            >
                {'\u00A0'.repeat(17)}<Skeleton height='30px'/>
            </span>
            
        </div>
    )
}