import styles from '../../module/HomeBadgeCard.module.css';
import { Skeleton } from './Skeleton';

export const HomeBadgeCardSkeleton = () => {

    return (
        <div className={styles.cardContainer}>
            <Skeleton width="15%" height="25px"/>
            <div style={{marginBottom: "20px"}}/>
            <Skeleton width='80%'/>
        </div>
    )
}