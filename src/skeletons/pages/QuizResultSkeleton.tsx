import styles from '../../module/QuizResults.module.css';
import { Skeleton } from '../components/Skeleton';

export const QuizResultSkeleton = () => {

    const questionSkeleton = Array.from({ length: 5 });
    return (
        <>
            <div className={styles.resultsWrapper}>

                <Skeleton height='550px' />
                <div className={styles.breakdownSection}>
                    <h3 className={styles.breakdownTitle}>Question Breakdown</h3>
                    <div className={styles.breakdownList}>
                        {questionSkeleton.map((_, index) => (
                            <Skeleton height='130px' key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}