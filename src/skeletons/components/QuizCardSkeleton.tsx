import styles from "../../module/QuizPage.module.css";
import { Skeleton } from "./Skeleton";
export const QuizCardSkeleton = () => {
    return (
        <article className={styles.quizCard}>
                            <div className={styles.cardTop}>
                                <Skeleton width='20%' height='30px' borderRadius='999px'/>
                                <Skeleton width='20%' height='40px' borderRadius='999px'/>
                            </div>

                            <div className={styles.quizContent}>
                                <Skeleton width="60%" height="30px"/>
                                <div style={{marginBottom: '5px'}}/>
                                <Skeleton width='20%' height='20px' borderRadius='999px'/>
                                <div style={{marginBottom: '15px'}}/>
                                <Skeleton width="25%"/>
                            </div>

                            <div className={styles.cardFooter}>
                                <Skeleton width="25%" height="45px"/>
                                <Skeleton width="25%" height="45px"/>
                                <Skeleton width="25%" height="45px"/>
                            </div>
                        </article>
    )
}