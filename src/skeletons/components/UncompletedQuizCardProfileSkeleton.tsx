import styles from '../../module/ProfilePage.module.css';
import { Skeleton } from './Skeleton';

export const UncompletedQuizCardProfileSkeleton = () => {
    return (
        <div className={styles.bubbleChallenge}>
            <div className={styles.challengeRow}>
                <div className={styles.challengeDetails}>
                    <Skeleton width='100%' height='18px'/>
                    {'\u00A0'.repeat(50)}
                    <Skeleton width='45%' height='10px'/>
                </div>
                <Skeleton height='35px' borderRadius='9999px' width='15%'/>
            </div>
            <div className={styles.progressTrack}>
                <div className={styles.progressFill}>
                    <Skeleton width='100%' height='10px'/>
                </div>
            </div>
        </div>
    )
}