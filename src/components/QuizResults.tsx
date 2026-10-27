import React from 'react';
import styles from '../module/QuizResults.module.css';
import type { QuizResultsProps } from '../types/quiz';
import { calculateNextLevel, formatTimeSpent } from '../utils/Utils';

export const QuizResults: React.FC<QuizResultsProps> = ({quiz, result, fallbackCorrect, fallbackScore, timeSpentSeconds, userSubmissions, initialUserXp, initialUserLevel, onRetry, onDelete, isDeleting = false, }) => {
  const totalQuestions = result?.totalQuestions ?? quiz.questions?.length ?? 0;
  const correctCount = result?.totalQuestions ?? (result as any)?.correctCount ?? fallbackCorrect;
  const xpEarned = result?.scoreEarned ?? fallbackScore;
  const currentXp = result?.currentXp ?? (initialUserXp + xpEarned);
  const currentLevel = result?.currentLevel ?? initialUserLevel;
  const leveledUp = result?.leveledUp ?? (currentLevel > initialUserLevel);

  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const nextLevelXp = calculateNextLevel(currentXp);
  const levelProgress = nextLevelXp > 0 ? Math.min(100, Math.round((currentXp / nextLevelXp) * 100)) : 0;

  const getPerformanceTier = () => {
    if (accuracy >= 90) return { title: 'Outstanding Mastery!', badge: '🏆 Gold Tier', className: styles.tierGold };
    if (accuracy >= 70) return { title: 'Great Job!', badge: '🥈 Silver Tier', className: styles.tierSilver };
    if (accuracy >= 50) return { title: 'Good Effort!', badge: '🥉 Bronze Tier', className: styles.tierBronze };
    return { title: 'Keep Practicing!', badge: '📚 Learner', className: styles.tierPractice };
  };

  const tier = getPerformanceTier();

  return (
    <div className={styles.resultsWrapper}>
      <div className={styles.heroCard}>
        <span className={`${styles.tierBadge} ${tier.className}`}>{tier.badge}</span>
        <h1 className={styles.title}>{tier.title}</h1>
        <p className={styles.subtitle}>You completed <strong>{quiz.title}</strong></p>

        {leveledUp && (
          <div className={styles.levelUpBanner}>
            <span className={styles.levelUpIcon}>🎉</span>
            <div>
              <h4>Level Up!</h4>
              <p>You advanced to <strong>Level {currentLevel}</strong>!</p>
            </div>
          </div>
        )}

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Accuracy</span>
            <span className={styles.statValue}>{accuracy}%</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>Correct Answers</span>
            <span className={styles.statValue}>{correctCount} / {totalQuestions}</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>XP Earned</span>
            <span className={`${styles.statValue} ${styles.xpHighlight}`}>+{xpEarned} XP</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>Time Spent</span>
            <span className={styles.statValue}>{formatTimeSpent(timeSpentSeconds)}</span>
          </div>
        </div>

        <div className={styles.xpSection}>
          <div className={styles.xpHeader}>
            <span className={styles.levelBadge}>Level {currentLevel}</span>
            <span className={styles.xpNumbers}>{currentXp} / {nextLevelXp} XP</span>
          </div>
          <div className={styles.xpTrack}>
            <div className={styles.xpFill} style={{ width: `${levelProgress}%` }} />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            ↻ Retry Quiz
          </button>
          {quiz.id && onDelete && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Quiz'}
            </button>
          )}
        </div>
      </div>

      {/* Question Breakdown Section */}
      <div className={styles.breakdownSection}>
        <h3 className={styles.breakdownTitle}>Question Breakdown</h3>
        <div className={styles.breakdownList}>
          {quiz.questions.map((q, index) => {
            const submission = userSubmissions.find(
              (sub) => sub.questionId === q.questionId
            ) ?? userSubmissions[index];

            const answers = q.answers ?? [];
            const selectedAnswer = answers.find((a: any) => a.answerId === submission?.selectedAnswerId);
            const correctAnswer = answers.find((a: any) => Boolean(a.isCorrect ?? a.correct));
            const isCorrect = Boolean((selectedAnswer as any)?.isCorrect ?? (selectedAnswer as any)?.correct);

            return (
              <div
                key={q.questionId ?? index}
                className={`${styles.questionCard} ${isCorrect ? styles.cardCorrect : styles.cardIncorrect}`}
              >
                <div className={styles.questionCardHeader}>
                  <span className={styles.questionNum}>Question {index + 1}</span>
                  <span className={isCorrect ? styles.statusPass : styles.statusFail}>
                    {isCorrect ? `✓ +${q.score || 10} XP` : '✕ 0 XP'}
                  </span>
                </div>

                <p className={styles.questionText}>{q.text}</p>

                <div className={styles.answerComparison}>
                  <div className={styles.answerRow}>
                    <span className={styles.answerLabel}>Your Answer:</span>
                    <span className={isCorrect ? styles.textCorrect : styles.textIncorrect}>
                      {selectedAnswer?.answerText ?? 'No answer recorded'}
                    </span>
                  </div>

                  {!isCorrect && correctAnswer && (
                    <div className={styles.answerRow}>
                      <span className={styles.answerLabel}>Correct Answer:</span>
                      <span className={styles.textCorrect}>{correctAnswer.answerText}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};