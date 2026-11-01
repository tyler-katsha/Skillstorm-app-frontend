import styles from "../../module/QuizPage.module.css";
import { QuizCardSkeleton } from "../components/QuizCardSkeleton";
import { Skeleton } from "../components/Skeleton";

export const QuizSkeleton = () => {

    const skeletonQuizzes = Array.from({ length: 10 });
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <Skeleton width="30%" height="35px"/>
                    {"\u00A0".repeat(100)}
                    <Skeleton width="100%" height="25px"/>
                </div>

                <Skeleton width="8%" height="35px"/>
            </div>

            <section className={styles.filters}>
                <div className={styles.searchWrapper}>
                    <span className={styles.searchIcon}>⌕</span>
                    <Skeleton width="100%" height="45px"/>
                </div>

                <div className={styles.categoryWrapper}>
                    <Skeleton width="30%"/>
                    <Skeleton width="100%" height="45px"/>
                </div>
            </section>

            <div className={styles.resultsHeader}>
                <Skeleton width="8%" height="35px"/>
                <Skeleton width="5%" height="30px" borderRadius="999px"/>
            </div>

            <section className={styles.quizGrid}>
                {skeletonQuizzes.map((_, index) => (
                    <QuizCardSkeleton key={index} />
                ))}
            </section>
        </main>
    )
}