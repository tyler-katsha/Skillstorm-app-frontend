import { useState, type ChangeEvent } from 'react';
import styles from '../module/CreateQuiz.module.css';
import { DEFAULT_QUESTION, type QuestionData } from '../types/question';
import type { CreateQuizProps, QuizData } from '../types/quiz';
import { CreateQuestion } from './CreateQuestion';

export const CreateQuiz: React.FC<CreateQuizProps> = ({ onSubmit, initialData }) => {


    const [title, setTitle] = useState(initialData?.title ?? "");

    const [difficulty, setDifficulty] = useState(initialData?.difficulty ?? "EASY");

    const [topicInput, setTopicInput] = useState<string>(initialData?.topicNames.join(", ") ?? "");

    const [questionCount, setQuestionCount] = useState(initialData?.questions.length ?? 1);

    const [questions, setQuestions] = useState<QuestionData[]>(initialData?.questions ?? [DEFAULT_QUESTION]);

    const createEmptyQuestion = (): QuestionData => ({
        text: "",
        options: ["", "", "", ""],
        correctOption: 0
    });

    const handleQuestionCountChange = (e: ChangeEvent<HTMLSelectElement>) => {

        const count = Number(e.target.value);

        setQuestionCount(count);

        setQuestions(currentQuestions => {

            const updatedQuestions = [
                ...currentQuestions
            ];

            while (updatedQuestions.length < count) {
                updatedQuestions.push(
                    createEmptyQuestion()
                );
            }

            return updatedQuestions.slice(0, count);
        });
    };

    const handleQuestionChange = (index: number, question: QuestionData) => {

        setQuestions(currentQuestions => {

            const updatedQuestions = [
                ...currentQuestions
            ];

            updatedQuestions[index] = question;

            return updatedQuestions;
        });
    };

    const handleRemoveQuestion = (index: number) => {

        setQuestions(currentQuestions =>
            currentQuestions.filter((_, questionIndex) => questionIndex !== index)
        );

        setQuestionCount(currentCount =>
            Math.max(1, currentCount - 1)
        );
    };


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        const topicNames = topicInput
            .split(",")
            .map(topic => topic.trim())
            .filter(Boolean);

        const quiz: QuizData = {
            title,
            difficulty,
            topicNames,
            questions
        };

        onSubmit(quiz);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>

            <div className={styles.header}>

                <h2>
                    Create Quiz
                </h2>

                <p>
                    Create your quiz and add your questions.
                </p>

            </div>

            <div className={styles.details}>

                <div className={styles.field}>

                    <label>
                        Quiz Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Enter quiz title"
                    />

                </div>


                <div className={styles.field}>

                    <label>
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(event) =>
                            setDifficulty(event.target.value)
                        }
                    >
                        <option value="EASY">
                            Easy
                        </option>

                        <option value="MEDIUM">
                            Medium
                        </option>

                        <option value="HARD">
                            Hard
                        </option>
                    </select>

                </div>


                <div className={styles.field}>

                    <label>
                        Topics
                    </label>

                    <input
                        type="text"
                        value={topicInput}
                        onChange={(event) => setTopicInput(event.target.value)}
                        placeholder="Java, Networking, Security"
                    />

                    <span className={styles.helpText}>
                        Separate topics with commas.
                    </span>

                </div>


                <div className={styles.field}>

                    <label>
                        Number of Questions
                    </label>

                    <select
                        value={questionCount}
                        onChange={handleQuestionCountChange}
                    >
                        {Array.from(
                            { length: 20 },
                            (_, index) => index + 1
                        ).map(number => (

                            <option
                                key={number}
                                value={number}
                            >
                                {number}
                            </option>

                        ))}
                    </select>

                </div>

            </div>


            <div className={styles.questions}>

                <div className={styles.questionsHeader}>

                    <h3>
                        Questions
                    </h3>

                    <span>
                        {questions.length} question
                        {questions.length !== 1 && "s"}
                    </span>

                </div>

                {questions.map(
                    (question, index) => (

                        <CreateQuestion
                            key={index}
                            questionNumber={index + 1}
                            initialData={question}
                            onChange={(updatedQuestion) =>
                                handleQuestionChange(
                                    index,
                                    updatedQuestion
                                )
                            }
                            onRemove={
                                questions.length > 1
                                    ? () =>
                                        handleRemoveQuestion(index)
                                    : undefined
                            }
                        />

                    )
                )}

            </div>


            <div className={styles.actions}>

                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Create Quiz
                </button>

            </div>

        </form>
    );
}