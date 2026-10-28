import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../module/Quiz.module.css';
import { calculateLevel, calculateNextLevel, getToken, OptionState } from '../utils/Utils';
import { RedirectUser } from './RedirectUser';
import type { QuizCompProps, QuizSubmissionPayload, SubmissionResult, UserAnswerSubmission } from '../types/quiz';
import { API } from '../utils/API';
import { Progressbars } from './Progressbars';
import { QuestionTextbox } from './QuestionTextbox';
import { QuestionOption } from './QuestionOption';
import { SubmitButton } from './SubmitButton';
import { QuizResults } from './QuizResults';
import { useUser } from '../contexts/UserContext';
import { saveUncompletedQuizProgress } from '../utils/services/trackerService';

export const Quiz: React.FC<QuizCompProps> = ({ sampleQuiz, sampleUser, onQuizDeleted, onBack }) => {
  const { updateUserStats } = useUser();
  const location = useLocation(); 
  
  const startTimerRef = useRef<number>(Date.now());
  const initialXpRef = useRef<number>(sampleUser?.xp ?? 0);

  // Extract location state safely
  const { resumeData, isResuming } = (location.state as any) || {};

  // Initialize question index strictly from resumeData.completedCount
  const [questionIdx, setQuestionIdx] = useState(() => {
    if (isResuming && resumeData?.completedCount) {
      return Number(resumeData.completedCount);
    }
    return 0;
  });
  
  const [score, setScore] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [userSubmissions, setUserSubmissions] = useState<UserAnswerSubmission[]>([]);
  
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [isAnswering, setIsAnswering] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [finalTimeSeconds, setFinalTimeSeconds] = useState<number>(0);

  // Ensure index stays in bounds when the quiz loads asynchronously
  useEffect(() => {
    if (sampleQuiz?.questions?.length && questionIdx >= sampleQuiz.questions.length) {
      setQuestionIdx(Math.max(0, sampleQuiz.questions.length - 1));
    }
  }, [sampleQuiz, questionIdx]);

  if (!sampleUser) {
    return <RedirectUser />;
  }

  const quickSelect = Boolean(sampleUser.options?.quick_select);
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

  const handleBackToQuizzes = async () => {
    // Requires a number type to match your service signature
    const quizId = Number(sampleQuiz?.id);
    const completedCount = questionIdx; 
    const totalCount = sampleQuiz?.questions?.length || 1;

    if (quizId) {
      try {
        // Matches your exact trackerService signature: (quizId, currentQuestionIndex, totalQuestions)
        await saveUncompletedQuizProgress(quizId, completedCount, totalCount);
      } catch (err) {
        console.error('Could not save uncompleted quiz progress:', err);
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
      const response = await fetch(`${API}/quizzes/${sampleQuiz.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit quiz results.');

      const result: SubmissionResult = await response.json();
      setSubmissionResult(result);

      if (result.currentXp !== undefined) {
        updateUserStats(result.currentXp, result.currentLevel);
      } else {
        const earned = result.scoreEarned ?? score;
        const newTotalXp = initialXpRef.current + earned;
        updateUserStats(newTotalXp, calculateLevel(newTotalXp));
      }
    } catch (error) {
      console.error('Error submitting quiz payload:', error);
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

  const handleDeleteQuiz = async () => {
    if (!sampleQuiz?.id) return alert("Cannot delete: Quiz ID is missing.");
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      setIsDeleting(true);
      const token = getToken();
      const response = await fetch(`${API}/quizzes/${sampleQuiz.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete quiz');

      if (onQuizDeleted) {
        onQuizDeleted(sampleQuiz.id);
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!sampleQuiz?.questions?.length) {
    return <div className={styles.pageRoot}>Loading quiz...</div>;
  }

  if (questionIdx >= sampleQuiz.questions.length || submissionResult) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.quizPageBg} aria-hidden="true" />
        {isSubmitting ? (
          <div className={styles.quizContainer} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h2>Calculating your results...</h2>
            <p>Updating your XP and saving your quiz history.</p>
          </div>
        ) : (
          <QuizResults
            quiz={sampleQuiz}
            result={submissionResult}
            fallbackCorrect={questionsCorrect}
            fallbackScore={score}
            timeSpentSeconds={finalTimeSeconds}
            userSubmissions={userSubmissions}
            initialUserXp={sampleUser.xp}
            initialUserLevel={calculateLevel(sampleUser.xp)}
            onRetry={handleRetryQuiz}
            onDelete={handleDeleteQuiz}
            isDeleting={isDeleting}
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
          <button type="button" onClick={handleBackToQuizzes} className={styles.backButton}>
            <span className={styles.backIcon} aria-hidden="true">←</span>
            <span>Back to Quizzes</span>
          </button>
        </div>

        <Progressbars
          answered={questionIdx + 1}
          total={sampleQuiz.questions.length}
          currentLevel={calculateLevel(sampleUser.xp)}
          currentXp={sampleUser.xp}
          nextLevelXp={calculateNextLevel(sampleUser.xp)}
        />

        <QuestionTextbox content={currentQuestion?.text} />

        <div className={styles.optionsList}>
          {answers.map((answer: any, i: number) => {
            const labelText = typeof answer === 'string' ? answer : (answer.answerText ?? answer.text ?? "");
            return (
              <Fragment key={answer.answerId ?? i}>
                <QuestionOption
                  label={labelText}
                  selected={selectedIdx === i}
                  state={getBtnState(i)}
                  myOnClick={() => handleSelectOption(i)}
                />
                {i < answers.length - 1 && <hr className={styles.divider} />}
              </Fragment>
            );
          })}
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
      </div>
    </div>
  );
};