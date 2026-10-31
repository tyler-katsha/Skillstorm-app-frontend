import styles from '../../module/HomeQuizCard.module.css'
import type { HomeQuizCardProps } from '../../types/card'

export const HomeQuizCard: React.FC<HomeQuizCardProps> = ({ quiz }) => {
    const difficultyClass = styles[quiz.difficulty.toLowerCase()] || styles.defaultBadge;
    return (
        <div className={styles.cardContainer}>
            <div className={styles.contentWrapper}>
                <h3 className={styles.title}>{quiz.topicName}</h3>
                <span className={`${styles.difficultyBadge} ${difficultyClass}`}>
                    {quiz.difficulty}
                </span>
            </div>

            <div className={styles.footerWrapper}>
                <span className={styles.questionNumberBubble}>
                    {quiz.numOfQuizForTopic} {quiz.numOfQuizForTopic === 1 ? 'Quiz' : 'Quizzes'}
                </span>
            </div>
        </div>
    );
}