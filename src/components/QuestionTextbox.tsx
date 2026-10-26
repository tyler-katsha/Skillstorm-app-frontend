import styles from '../module/Quiz.module.css';
export const QuestionTextbox: React.FC<{ content: string }> = ({ content }) => {
  return <div className={styles.questionTextbox}>{content}</div>;
};