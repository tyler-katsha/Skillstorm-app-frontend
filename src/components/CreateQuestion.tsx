import { useState } from "react";
import { DEFAULT_QUESTION, type CreateQuestionProps, type QuestionData } from "../types/question";
import styles from '../module/CreateQuestion.module.css';

export const CreateQuestion: React.FC<CreateQuestionProps> = ({ questionNumber, initialData, onChange, onRemove }) => {

    const [question, setQuestion] = useState<QuestionData>(initialData ?? DEFAULT_QUESTION);

    const updateQuestion = (updatedQuestion: QuestionData) => {
        setQuestion(updatedQuestion);
        onChange(updatedQuestion);
    }

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuestion({ ...question, text: e.target.value });
    }

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...question.options];

        updatedOptions[index] = value;

        updateQuestion({ ...question, options: updatedOptions });
    }

    const handleCorrectOptionChange = (index: number) => {
        updateQuestion({ ...question, correctOption: index });
    }

    return (
        <div className={styles.question}>

            <div className={styles.header}>

                <h3>
                    Question {questionNumber}
                </h3>

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

                <label>
                    Question
                </label>

                <input
                    type="text"
                    value={question.text}
                    onChange={handleQuestionChange}
                    placeholder="Enter your question"
                />

            </div>

            <div className={styles.answers}>

                {question.options.map(
                    (option, index) => (

                        <div
                            className={styles.answer}
                            key={index}
                        >

                            <input
                                type="radio"
                                name={`correct-answer-${questionNumber}`}
                                checked={
                                    question.correctOption === index
                                }
                                onChange={() =>
                                    handleCorrectOptionChange(
                                        index
                                    )
                                }
                                className={styles.radio}
                            />

                            <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                    handleOptionChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                placeholder={`Answer ${index + 1}`}
                            />

                        </div>

                    )
                )}

            </div>

        </div>
    );


}