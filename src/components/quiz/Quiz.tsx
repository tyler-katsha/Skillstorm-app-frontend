import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import type { QuizComponentProps, QuizLocationState, QuizSubmissionPayload, SubmissionResult, UserAnswerSubmission } from '../../types/quiz';
import { API } from '../../utils/API';
import { saveUncompletedQuizProgress } from '../../utils/services/trackerService';
import { calculateLevel, calculateNextLevel, getToken, OptionState } from '../../utils/Utils';
import { RedirectUser } from '../auth/RedirectUser';
import { SubmitButton } from '../buttons/SubmitButton';
import styles from '../../module/Quiz.module.css';
import { Progressbars } from '../helperComp/Progressbars';
import { QuestionOption } from '../question/QuestionOption';
import { QuestionTextbox } from '../question/QuestionTextbox';
import { QuizResults } from './QuizResults';
import type { BadgeResponse } from '../../types/badge';
import { QuizResultSkeleton } from '../../skeletons/pages/QuizResultSkeleton';
import { onLeaderboardRefresh } from '../../utils/services/LeaderboardApi';
import { useToast } from '../../contexts/ToastContext';
import { handleHttpErrors } from '../../utils/httpUtils';

export const Quiz: React.FC<QuizComponentProps> = ({ sampleQuiz, onBack }) => {
  const { updateUserStats, user } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    return <RedirectUser />;
  }

  const location = useLocation();

  const startTimerRef = useRef<number>(Date.now());
  const initialXpRef = useRef<number>(user.xp ?? 0);

  const { resumeData, isResuming } = (location.state as QuizLocationState) || {};

  const [questionIdx, setQuestionIdx] = useState(() => {
    if (isResuming && resumeData?.completedCount) {
      return Number(resumeData.completedCount);
    }
    return 0;
  });

  const [earnedToasts, setEarnedToasts] = useState<BadgeResponse[]>([]);
  const [score, setScore] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [userSubmissions, setUserSubmissions] = useState<UserAnswerSubmission[]>([]);

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [isAnswering, setIsAnswering] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [finalTimeSeconds, setFinalTimeSeconds] = useState<number>(0);

  console.log(resumeData)
  useEffect(() => {
    if (sampleQuiz?.questions?.length && questionIdx >= sampleQuiz.questions.length) {
      setQuestionIdx(Math.max(0, sampleQuiz.questions.length - 1));
    }
  }, [sampleQuiz, questionIdx]);

  const quickSelect = Boolean(user.options?.quick_select);
  const currentQuestion = sampleQuiz?.questions?.[questionIdx];
  const answers = currentQuestion?.answers ?? [];

  const isChoiceCorrect = (index: number) => {
    const ans = answers[index] as any;
    if (ans) {
      return Boolean(ans.isCorrect ?? ans.correct);
    }
    return index === currentQuestion?.correctOption;
  };

  const getBtnState = (index: number) => {
    if (isAnswering) return OptionState.POSSIBLE;
    if (isChoiceCorrect(index)) return OptionState.CORRECT;
    if (index === selectedIdx) return OptionState.INCORRECT;
    return OptionState.UNSELECTED;
  };

  const handleCheckAnswer = (indexToCheck = selectedIdx) => {
    if (indexToCheck === -1) return;

    if (isChoiceCorrect(indexToCheck)) {
      setScore((prev: number) => prev + (currentQuestion?.score || 10));
      setQuestionsCorrect((prev: number) => prev + 1);
    }
    setIsAnswering(false);
  };

  const handleBackQuiz = () => {
    window.location.reload();
  }

  const handleBackToQuizzes = async (finalAnswers: UserAnswerSubmission[]) => {
    const quizId = Number(sampleQuiz?.id);
    const completedCount = questionIdx;
    const totalCount = sampleQuiz?.questions?.length || 1;

    if (quizId) {
      try {
        await saveUncompletedQuizProgress(quizId, completedCount, totalCount, finalAnswers);
      } catch (err) {
        showToast('Could not save uncompleted quiz progress', 'error');
      }
    }

    if (onBack) onBack();
  };

  const submitQuiz = async (finalAnswers: UserAnswerSubmission[]) => {
    setIsSubmitting(true);
    const token = getToken();

    const endTime = Date.now();
    const timeSpentSeconds = Math.max(1, Math.round((endTime - startTimerRef.current) / 1000));
    setFinalTimeSeconds(timeSpentSeconds);

    const payload: QuizSubmissionPayload = {
      timeSpentSeconds,
      answers: finalAnswers,
    };

    try {
      const preRes = await fetch(`${API}/badges`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if(handleHttpErrors(preRes.status,navigate,showToast)) return;
      const preBadges: BadgeResponse[] = await preRes.json();
      const previouslyEarnedIds = preBadges.filter(b => b.earned).map(b => b.id);

      const response = await fetch(`${API}/quizzes/${sampleQuiz.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if(handleHttpErrors(response.status,navigate,showToast)) return;

      if (!response.ok) throw new Error('Failed to submit quiz results.');

      await onLeaderboardRefresh();
      const result: SubmissionResult = await response.json();
      setSubmissionResult(result);

      if (result.currentXp !== undefined) {
        updateUserStats(result.currentXp, result.currentLevel);
      } else {
        const earned = result.scoreEarned ?? score;
        const newTotalXp = initialXpRef.current + earned;
        updateUserStats(newTotalXp, calculateLevel(newTotalXp));
      }

      setTimeout(async () => {
        try {
          const res = await fetch(`${API}/badges/user`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if(handleHttpErrors(res.status,navigate,showToast)) return;

          if (!res.ok) throw new Error('Failed to fetch updated badges');
          const updatedBadges: BadgeResponse[] = await res.json();

          const newlyEarnedBadges = updatedBadges.filter(b => b.earned && !previouslyEarnedIds.includes(b.id));

          if (newlyEarnedBadges.length > 0) {
            setEarnedToasts(newlyEarnedBadges);
          }
        } catch (err) {
          showToast('Error fetching updated badges', 'error');
        }
      }, 5000);
    } catch (error) {
      showToast('Error submitting quiz payload', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    const selectedAnswerObj = answers[selectedIdx] as any;
    const newSubmission: UserAnswerSubmission = {
      questionId: currentQuestion?.questionId ?? 0,
      selectedAnswerId: selectedAnswerObj?.answerId ?? 0,
    };

    const updatedSubmissions = [...userSubmissions, newSubmission];
    setUserSubmissions(updatedSubmissions);

    setSelectedIdx(-1);
    setIsAnswering(true);

    const isLastQuestion = questionIdx + 1 >= (sampleQuiz?.questions?.length || 0);

    if (isLastQuestion) {
      submitQuiz(updatedSubmissions);
    } else {
      setQuestionIdx((prev: number) => prev + 1);
    }
  };

  const handleRetryQuiz = () => {
    startTimerRef.current = Date.now();
    setQuestionIdx(0);
    setScore(0);
    setQuestionsCorrect(0);
    setSelectedIdx(-1);
    setIsAnswering(true);
    setUserSubmissions([]);
    setSubmissionResult(null);
    setFinalTimeSeconds(0);
  };

  const handleSelectOption = (index: number) => {
    if (!isAnswering) return;
    setSelectedIdx(index);
    if (quickSelect) handleCheckAnswer(index);
  };

  if (!sampleQuiz?.questions?.length) {
    return <div className={styles.pageRoot}>Loading quiz...</div>;
  }

  if (isSubmitting) {
    return <QuizResultSkeleton />
  }
  if (questionIdx >= sampleQuiz.questions.length || submissionResult) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.quizPageBg} aria-hidden="true" />
        {isSubmitting ? (
          <QuizResultSkeleton />
        ) : (
          <QuizResults
            quiz={sampleQuiz}
            result={submissionResult}
            fallbackCorrect={questionsCorrect}
            fallbackScore={score}
            timeSpentSeconds={finalTimeSeconds}
            userSubmissions={userSubmissions}
            initialUserXp={user.xp}
            initialUserLevel={calculateLevel(user.xp)}
            onRetry={handleRetryQuiz}
            onBack={handleBackQuiz}
            earnedToasts={earnedToasts}
            setEarnedToasts={setEarnedToasts}
          />
        )}
      </div>
    );
  }

  const isFinalQuestion = questionIdx === sampleQuiz.questions.length - 1;

  return (
    <div className={styles.pageRoot}>
      <div className={styles.quizPageBg} aria-hidden="true" />
      <div className={styles.quizContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', width: '100%' }}>
          <button type="button" onClick={() => handleBackToQuizzes(userSubmissions)} className={styles.backButton}>
            <span className={styles.backIcon} aria-hidden="true">←</span>
            <span>Back to Quizzes</span>
          </button>
        </div>

        <Progressbars
          answered={questionIdx + 1}
          total={sampleQuiz.questions.length}
          currentLevel={calculateLevel(user.xp)}
          currentXp={user.xp}
          nextLevelXp={calculateNextLevel(user.xp)}
        />

        <QuestionTextbox content={currentQuestion?.text} />

        <div className={styles.optionsList} style={{ marginBottom: (!isAnswering && selectedIdx !== -1 && !isChoiceCorrect(selectedIdx) && currentQuestion?.description) ? '1rem' : '2rem' }}>
          {answers
            .map((answer: any, i: number) => {
              const rawText = typeof answer === 'string' ? answer : (answer.answerText ?? answer.text ?? "");
              return { answer, originalIndex: i, labelText: rawText.trim() };
            })
            .filter((item: any) => item.labelText !== '')
            .map((item: any, mappedIndex: number, validArray: any[]) => {
              const { answer, originalIndex, labelText } = item;

              return (
                <Fragment key={answer.answerId ?? originalIndex}>
                  <QuestionOption
                    label={labelText}
                    selected={selectedIdx === originalIndex}
                    state={getBtnState(originalIndex)}
                    myOnClick={() => handleSelectOption(originalIndex)}
                  />
                  {mappedIndex < validArray.length - 1 && <hr className={styles.divider} />}
                </Fragment>
              );
            })
          }
        </div>

        {quickSelect ? (
          !isAnswering && (
            <SubmitButton
              label={isFinalQuestion ? "Finish quiz" : "Next question"}
              disabled={false}
              myOnClick={handleNextQuestion}
            />
          )
        ) : (
          <SubmitButton
            label={isAnswering ? "Check answer" : (isFinalQuestion ? "Finish quiz" : "Next question")}
            disabled={selectedIdx === -1}
            myOnClick={isAnswering ? () => handleCheckAnswer(selectedIdx) : handleNextQuestion}
          />
        )}

        {!isAnswering && selectedIdx !== -1 && currentQuestion?.description && (
          <div className={styles.explanationBox} style={{ marginBottom: '1.5rem', padding: '12px 16px', backgroundColor: '#e9f5fe', borderLeft: '4px solid #007bff', borderRadius: '0 4px 4px 0', color: '#004085', fontSize: '0.95rem', lineHeight: '1.4' }}>
            <strong>Explanation:</strong> {currentQuestion.description}
          </div>
        )}
      </div>
    </div>
  );
};