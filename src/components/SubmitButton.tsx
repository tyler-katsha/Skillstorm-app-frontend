import styles from '../module/Quiz.module.css';
import type { SubmitButtonProps } from '../types/quiz';
export const SubmitButton: React.FC<SubmitButtonProps> = ({ label, disabled = false, myOnClick }) => {
  return <button type="button" className={styles.submitButton} disabled={disabled} onClick={myOnClick}>{label}</button>;
};