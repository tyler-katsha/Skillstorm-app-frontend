import styles from '../../module/HomeQuizCard.module.css'
import { Skeleton } from './Skeleton';

export const HomeQuizCardSkeleton = () => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.contentWrapper}>
                <Skeleton width='70%' height='25px'/>
                <Skeleton width='29%'/>
            </div>

            <div className={styles.footerWrapper}>
                {"\u00A0"}<Skeleton width='50%' height='40px' borderRadius='999px'/>
            </div>
        </div>
    )
}