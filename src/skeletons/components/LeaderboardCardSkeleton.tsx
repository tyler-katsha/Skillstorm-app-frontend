import styles from '../../module/Home.module.css'
import { Skeleton } from './Skeleton'
export const LeaderboardCardSkeleton = () => {

    return (
        <div className={styles.bigCardContainer}>
                <Skeleton height='20px' width='17%'/>
                <Skeleton height='45px' width='57%'/>
                <Skeleton height='25px' width='27%'/>
                <Skeleton height='25px' width='24%'/>
                <Skeleton height='50px' width='150px' borderRadius='9999px'/>
        </div>
    )
}