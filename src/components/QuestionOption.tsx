import { OptionState } from "../utils/Utils";
import styles from '../module/Quiz.module.css';
import type { QuestionOptionProps } from "../types/user";
export const QuestionOption: React.FC<QuestionOptionProps> = ({ label, selected, state, myOnClick }) => {
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

  const isAnswerChecked = state === OptionState.CORRECT || state === OptionState.INCORRECT || state === OptionState.UNSELECTED;

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