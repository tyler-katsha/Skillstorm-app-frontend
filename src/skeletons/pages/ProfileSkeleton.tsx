import { ProfileImageHolderSkeleton } from '../components/ProfileImageHolderSkeleton';
import { QuizProfileAttemptSkeleton } from '../components/QuizProfileAttemptSkeleton';
import { UncompletedQuizCardProfileSkeleton } from '../components/UncompletedQuizCardProfileSkeleton';
import styles from '../../module/ProfilePage.module.css';
import { Skeleton } from '../components/Skeleton';
import { MetricItemSkeleton } from '../components/MetricItemSkeleton';
import { Divider } from '../../components/common/Divider';

export const ProfileSkeleton = () => {

    const skeletonAttemptProfile = Array.from({length: 5});
    const skeletonUncompletedProfile = Array.from({length: 10});
    const skeletonMetricItems = Array.from({length: 4});
    return (
        <div className={styles.pageWrapper}>
            <Skeleton width='15%' height='30px'/>

            <p className={styles.titleDescription}>
                {'\u00A0'.repeat(45)}
                <Skeleton />
            </p>


            <div className={styles.profileContainer}>
                <div className={styles.leftContainer}>
                    <ProfileImageHolderSkeleton />

                    <div className={styles.statsGrid}>
                        <Skeleton width='30%'/>
                        <Skeleton width='30%'/>
                        <Skeleton width='30%'/>
                    </div>

                    <div className={styles.historySection}>
                        <div className={styles.historyHeader}>
                            <Skeleton width='80%' height='30px'/>
                            <div style={{marginRight: '20px'}}/>
                            <Skeleton width='40%' height='20px'/>
                        </div>

                        <div className={styles.trackerMetricsGrid}>
                            {skeletonMetricItems.map((_,idx) => (
                                <MetricItemSkeleton key={idx}/>
                            ))}
                        </div>

                        <Skeleton width='50%'/>
                        <div className={styles.attemptList}>
                            {skeletonAttemptProfile.map((_, idx) => (
                                <QuizProfileAttemptSkeleton key={idx}/>
                            ))}
                        </div>
                    </div>

                    <div className={styles.userData}>
                        <Skeleton width='100%'/>
                        <Skeleton width='30%'/>
                    </div>
                </div>

                <div className={styles.rightContainer}>

                    <div className={styles.statsCardData}>
                        <Skeleton width='13%'/>
                        <div style={{marginBottom: '10px'}}/>
                        <Divider />
                        <p className={styles.ranking}>{'\u00A0'.repeat(150)}<Skeleton width='10%'/></p>
                        <p className={styles.points}>{'\u00A0'.repeat(150)}<Skeleton width='10%'/></p>
                        <p className={styles.winRate}>{'\u00A0'.repeat(150)}<Skeleton width='18%'/></p>
                    </div>

                    <div className={styles.statsCardData}>
                        <Skeleton width='38%'/>
                        <div style={{marginBottom: '10px'}}/>
                        <Divider />
                        <div className={styles.quizRowsContainer}>
                            {skeletonUncompletedProfile.map((_, idx: number) => (
                                <UncompletedQuizCardProfileSkeleton key={idx}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <p className={styles.bottomDescription}>SkillStorm - Compete, Earn, Conquer</p>
        </div>
    )
}