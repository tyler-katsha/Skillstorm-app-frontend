import React from 'react';
import { DEFAULT_QUESTION, type CreateQuestionProps, type QuestionData } from "../types/question";
import styles from '../module/CreateQuestion.module.css';

export const CreateQuestion: React.FC<CreateQuestionProps> = ({ questionNumber, initialData, onChange, onRemove }) => {
  const question: QuestionData = {
    ...DEFAULT_QUESTION,
    ...initialData,
    options: initialData?.options && initialData.options.length > 0 
      ? initialData.options 
      : [...DEFAULT_QUESTION.options],
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...question, text: e.target.value });
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value, 10) || 0;
    onChange({ ...question, score: newScore });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    onChange({ ...question, options: updatedOptions });
  };

  const handleCorrectOptionChange = (index: number) => {
    onChange({ ...question, correctOption: index });
  };

  return (
    <div className={styles.question}>
      <div className={styles.header}>
        <h3>Question {questionNumber}</h3>
        {onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
          >
            Remove
          </button>
        )}
      </div>

      <div className={styles.field}>
        <label>Question</label>
        <input
          type="text"
          value={question.text}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
        />
      </div>

      <div className={styles.field}>
        <label>Points</label>
        <input
          type="number"
          min="1"
          value={question.score ?? 10}
          onChange={handleScoreChange}
          placeholder="10"
        />
      </div>

      <div className={styles.answers}>
        {question.options.map((option, index) => (
          <div className={styles.answer} key={index}>
            <input
              type="radio"
              name={`correct-answer-${questionNumber}`}
              checked={question.correctOption === index}
              onChange={() => handleCorrectOptionChange(index)}
              className={styles.radio}
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Answer ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};