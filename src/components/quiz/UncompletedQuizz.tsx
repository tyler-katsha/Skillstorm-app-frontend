import { useNavigate } from 'react-router-dom';
import styles from '../../module/ProfilePage.module.css';
import type { QuizData, UncompletedQuizProps } from '../../types/quiz';

export const UncompletedQuiz:React.FC<UncompletedQuizProps> = ({pct,quiz, qId}) => {

    const navigate = useNavigate();

    const handleResumeQuiz = (quizId: number, quizData: QuizData) => {
        navigate(`/quizzes/${quizId}`, {
            state: {
                resumeData: quizData,
                isResuming: true
            }
        });
    };
    console.log(pct);
    return (
        <div className={styles.bubbleChallenge}>
            <div className={styles.challengeRow}>
                <div className={styles.challengeDetails}>
                    <span className={styles.challengeTitle}>{quiz.title}</span>
                    <span className={styles.challengePercent}>{pct}% completed</span>
                </div>
                <button
                    type="button"
                    onClick={() => handleResumeQuiz(qId, quiz)}
                    className={styles.resumeBtn}
                >
                    Resume
                </button>
            </div>
            <div className={styles.progressTrack}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    )
}