import styles from '../../module/HomeBadgeCard.module.css';
import { Skeleton } from './Skeleton';

export const HomeBadgeCardSkeleton = () => {

    return (
        <div className={styles.cardContainer}>
            <Skeleton width='50%' height='100px'/>
            <div style={{marginBottom: '30px'}}/>
            <Skeleton width='80%'/>
        </div>
    )
}