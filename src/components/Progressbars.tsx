import { useMemo } from 'react';
import styles from '../module/Quiz.module.css';
import type { ProgressbarsProps } from '../types/quiz';
import { pluralS } from '../utils/Utils';

export const Progressbars: React.FC<ProgressbarsProps> = ({ answered, total, currentLevel, currentXp, nextLevelXp }) => {
  const quizProgress = total > 0 ? Math.min(100, Math.max(0, Math.round((answered / total) * 100))) : 0;
  const levelProgress = nextLevelXp > 0 ? Math.min(100, Math.max(0, Math.round((currentXp / nextLevelXp) * 100))) : 0;
  const unanswered = Math.max(0, total - answered);

  const questionsToGo = useMemo(() => {
    if (unanswered > 1) {
      return (
        <>
          <span className={styles.bigger}>{unanswered} </span>
          <span>question{pluralS ? pluralS(unanswered) : 's'} to go</span>
        </>
      );
    }
    if (unanswered === 1) {
      return (
        <>
          <span className={styles.bigger}>1 </span>
          <span>question to go</span>
        </>
      );
    }
    return <span>Last question!</span>;
  }, [unanswered]);

  return (
    <div className={styles.pbars}>
      <div
        className={styles.xpPbar}
        role="progressbar"
        aria-valuenow={currentXp}
        aria-valuemin={0}
        aria-valuemax={nextLevelXp}
        aria-label="XP progress"
        style={{
          background: `linear-gradient(90deg, var(--ink) ${levelProgress}%, var(--guardsman-red) ${levelProgress}%)`,
        }}
      >
        <span className={styles.pbarLeftText}>{currentXp} / {nextLevelXp} XP</span>
        <span className={styles.pbarRightText}>Level {currentLevel}</span>
      </div>

      <div
        className={styles.quizPbar}
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Quiz progress"
        style={{
          background: `linear-gradient(90deg, var(--primary-blue) ${quizProgress}%, var(--guardsman-red) ${quizProgress}%)`,
        }}
      >
        <span className={styles.pbarLeftText}>
          <span className={styles.smaller}>Question&nbsp;</span>
          <strong className={styles.bigger}>{answered}</strong>
        </span>
        <span className={styles.pbarRightText}>{questionsToGo}</span>
      </div>
    </div>
  );
};