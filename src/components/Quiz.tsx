import React, { useState, Fragment, useMemo } from 'react';
import styles from '../module/Quiz.module.css';
import { calculateLevel, calculateNextLevel, OptionState, pluralS, type OptionStateT } from '../utils/Utils';
import type { QuizProps, UserProps } from '../utils/type';
import { RedirectUser } from './RedirectUser';

interface ProgressbarsProps {
  answered: number;
  total: number;
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
}

const Progressbars: React.FC<ProgressbarsProps> = ({answered, total, currentLevel, currentXp, nextLevelXp}) => {
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
        <span className={styles.pbarLeftText}>
          {currentXp} / {nextLevelXp} XP
        </span>
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

const QuestionTextbox: React.FC<{ content: string }> = ({ content }) => {
  return <div className={styles.questionTextbox}>{content}</div>;
};

interface QuestionOptionProps {
  label: string;
  selected: boolean;
  state: OptionStateT;
  myOnClick: () => void;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({label, selected, state, myOnClick}) => {
  const getStateClass = () => {
    switch (state) {
      case OptionState.CORRECT:
        return styles.correct;
      case OptionState.INCORRECT:
        return styles.incorrect;
      case OptionState.UNSELECTED:
        return styles.unselected;
      case OptionState.POSSIBLE:
      default:
        return selected ? styles.selected : '';
    }
  };

  const renderIndicator = () => {
    if (state === OptionState.CORRECT) return '✓';
    if (state === OptionState.INCORRECT) return '✕';
    return null;
  };

  const isAnswerChecked =
    state === OptionState.CORRECT ||
    state === OptionState.INCORRECT ||
    state === OptionState.UNSELECTED;

  return (
    <button
      type="button"
      className={`${styles.quizOptionButton} ${getStateClass()}`}
      onClick={myOnClick}
      disabled={isAnswerChecked}
    >
      <span>{label}</span>
      {renderIndicator() && (
        <span className={styles.optionIndicator}>{renderIndicator()}</span>
      )}
    </button>
  );
};

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  myOnClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({label, disabled = false, myOnClick,}) => {
  return (
    <button
      type="button"
      className={styles.submitButton}
      disabled={disabled}
      onClick={myOnClick}
    >
      {label}
    </button>
  );
};

interface CongratsProps {
  correct: number;
  total: number;
  xpGained:number;
}

const Congrats: React.FC<CongratsProps> = ({ correct, total,xpGained }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className={styles.congratsBlock}>
      <h2>Quiz Completed!</h2>
      <p>
        You scored{' '}
        <span className={styles.congratsFraction}>
          {correct} / {total}
        </span>{' '}
        (<span className={styles.congratsPercentage}>{percentage}%</span>)
        <span className={styles.xpGainedCongrats}>
            {xpGained}
        </span>
      </p>
    </div>
  );
};

interface QuizCompProps {
  sampleQuiz: QuizProps;
  sampleUser: UserProps | null;
}

export const Quiz: React.FC<QuizCompProps> = ({ sampleQuiz, sampleUser }) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsCorrect,setQuestionsCorrect] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [isAnswering, setIsAnswering] = useState(true);

  if (!sampleUser) {
    return <RedirectUser />;
  }

  const quickSelect = Boolean(sampleUser.options?.quick_select);
  const currentQuestion = sampleQuiz?.questions?.[questionIdx];

  if (!sampleQuiz?.questions?.length || questionIdx >= sampleQuiz.questions.length) {
    return (
      <div className={styles.pageRoot}>
        <div className={styles.quizPageBg} aria-hidden="true" />
        <div className={styles.quizContainer}>
          <Congrats correct={questionsCorrect} total={sampleQuiz?.questions?.length || 0} xpGained={score}/>
        </div>
      </div>
    );
  }

  const getBtnState = (index: number) => {
    if (isAnswering) {
      return OptionState.POSSIBLE;
    }
    if (currentQuestion.answers[index]?.isCorrect) {
      return OptionState.CORRECT;
    }
    if (index === selectedIdx) {
      return OptionState.INCORRECT;
    }
    return OptionState.UNSELECTED;
  };

  const handleCheckAnswer = (indexToCheck = selectedIdx) => {
    if (indexToCheck === -1) return;

    const selectedAnswer = currentQuestion.answers[indexToCheck];
    if (selectedAnswer?.isCorrect) {
      setScore((prev) => prev + (currentQuestion.score || 1));
      setQuestionsCorrect((prev) => prev + 1);
    }
    setIsAnswering(false);
  };

  const handleNextQuestion = () => {
    setSelectedIdx(-1);
    setIsAnswering(true);
    setQuestionIdx((prev) => prev + 1);
  };

  const handleSelectOption = (index: number) => {
    if (!isAnswering) return;

    setSelectedIdx(index);

    if (quickSelect) {
      handleCheckAnswer(index);
    }
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.quizPageBg} aria-hidden="true" />

      <div className={styles.quizContainer}>
        <Progressbars
          answered={questionIdx + 1}
          total={sampleQuiz.questions.length}
          currentLevel={calculateLevel(sampleUser.xp)}
          currentXp={sampleUser.xp}
          nextLevelXp={calculateNextLevel(sampleUser.xp)}
        />

        <QuestionTextbox content={currentQuestion.text} />

        <div className={styles.optionsList}>
          {currentQuestion.answers.map((answer, i) => (
            <Fragment key={i}>
              <QuestionOption
                label={answer.text}
                selected={selectedIdx === i}
                state={getBtnState(i)}
                myOnClick={() => handleSelectOption(i)}
              />
              {i < currentQuestion.answers.length - 1 && (
                <hr className={styles.divider} />
              )}
            </Fragment>
          ))}
        </div>

        {quickSelect ? (
          !isAnswering && (
            <SubmitButton
              label="Next question"
              disabled={false}
              myOnClick={handleNextQuestion}
            />
          )
        ) : (
          <SubmitButton
            label={isAnswering ? "Check answer" : "Next question"}
            disabled={selectedIdx === -1}
            myOnClick={isAnswering ? handleCheckAnswer : handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
};