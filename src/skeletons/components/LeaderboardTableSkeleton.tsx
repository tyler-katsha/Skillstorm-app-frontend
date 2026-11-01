import styles from '../../module/Leaderboard.module.css';
import type { LeaderboardTableSkeletonProps } from '../../types/skeleton';
import { LeaderboardRowSkeleton } from './LeaderboardRowSkeleton';
import { Skeleton } from './Skeleton';

export const LeaderboardTableSkeleton: React.FC<LeaderboardTableSkeletonProps> = ({length = 5}) => {

    const skeletonRows = Array.from({length: length});
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', backgroundColor: '', minHeight: '100%' }}>
            <div className={styles.card}>
                <h2 className={styles.title}><Skeleton height='25px' width='23%'/></h2>
                <div className={styles.list}>
                    {skeletonRows.map((_,index) => (
                        <LeaderboardRowSkeleton key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}