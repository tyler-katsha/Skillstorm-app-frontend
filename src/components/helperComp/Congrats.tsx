import type { CongratsProps } from '../../types/quiz';
import styles from '../../module/Quiz.module.css';

export const Congrats: React.FC<CongratsProps> = ({ correct, total, xpGained }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className={styles.congratsBlock}>
      <h2>Quiz Completed!</h2>
      <p>
        You scored{' '}
        <span className={styles.congratsFraction}>{correct} / {total}</span>{' '}
        (<span className={styles.congratsPercentage}>{percentage}%</span>)
        <span className={styles.xpGainedCongrats}>{xpGained}</span>
      </p>
    </div>
  );
};