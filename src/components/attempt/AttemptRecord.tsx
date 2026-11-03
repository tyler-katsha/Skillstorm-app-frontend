import type { AttemptRecordProps } from '../../types/attempt';
import styles from '../../module/ProfilePage.module.css';

export const AttemptRecord: React.FC<AttemptRecordProps> = ({ attempt }) => {

    return (
        <div className={styles.attemptRow}>
            <div className={styles.attemptInfo}>
                <span className={styles.attemptTitle}>
                    {attempt.quizTitle || `Quiz #${attempt.quizId}`} (Try #{attempt.attemptNumber})
                </span>
                <span className={styles.attemptMeta}>
                    {attempt.correctAnswers}/{attempt.questionsAnswered} correct • +{attempt.gainedXp} XP
                </span>
            </div>
            <span
                className={`${styles.attemptStatus} ${attempt.isPerfectQuiz ? styles.statusPerfect : attempt.isQuizWon ? styles.statusWon : styles.statusLost
                    }`}
            >
                {attempt.isPerfectQuiz ? 'Perfect' : attempt.isQuizWon ? 'Won' : 'Lost'}
            </span>
        </div>
    )
}