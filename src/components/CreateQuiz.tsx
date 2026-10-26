import { useState, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../module/CreateQuiz.module.css';
import { DEFAULT_QUESTION, type QuestionData } from '../types/question';
import type { UpdateQuizData } from '../types/quiz';
import { CreateQuestion } from './CreateQuestion';
import { API } from "../utils/API";
import { getToken } from '../utils/Utils';

export const CreateQuiz: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [qId, setQid] = useState(0);
  const [difficulty, setDifficulty] = useState("EASY");
  const [topicInput, setTopicInput] = useState<string>("");
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState<QuestionData[]>([{ ...DEFAULT_QUESTION }]);

  const fetchQuiz = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${API}/quizzes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz data.");
      }
      const data: any = await response.json();
      setQid(data.id || 0);
      setTitle(data.title || "");
      setDifficulty(data.difficulty || "EASY");
      const topicsList: string[] = data.topicNames || data.topics || [];
      setTopicInput(topicsList.length > 0 ? topicsList.join(", ") : "");

      const fetchedQuestions: QuestionData[] = data.questions && data.questions.length > 0
        ? data.questions.map((q: any) => {
            // Check both isCorrect and correct flags
            const correctIndex = q.answers?.findIndex((a: any) => Boolean(a.isCorrect ?? a.correct));
            return {
              questionId: q.questionId,
              text: q.text || "",
              score: q.score || 10,
              options: q.answers?.map((a: any) => a.answerText) || ["", "", "", ""],
              correctOption: correctIndex !== -1 ? correctIndex : 0,
              answerIds: q.answers?.map((a: any) => a.answerId) || []
            };
          })
        : [{ ...DEFAULT_QUESTION }];

      setQuestions(fetchedQuestions);
      setQuestionCount(fetchedQuestions.length);

    } catch (error) {
      console.error("Failed to fetch quiz data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchQuiz();
    }
  }, [id, isEditMode]);

  const createEmptyQuestion = (): QuestionData => ({
    ...DEFAULT_QUESTION,
    options: ["", "", "", ""]
  });

  const handleQuestionCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const count = Number(e.target.value);
    setQuestionCount(count);

    setQuestions(currentQuestions => {
      const updatedQuestions = [...currentQuestions];
      while (updatedQuestions.length < count) {
        updatedQuestions.push(createEmptyQuestion());
      }
      return updatedQuestions.slice(0, count);
    });
  };

  const handleQuestionChange = (index: number, question: QuestionData) => {
    setQuestions(currentQuestions => {
      const updatedQuestions = [...currentQuestions];
      updatedQuestions[index] = question;
      return updatedQuestions;
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(currentQuestions => currentQuestions.filter((_, questionIndex) => questionIndex !== index));
    setQuestionCount(currentCount => Math.max(1, currentCount - 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const topics = topicInput
      .split(",")
      .map(topic => topic.trim())
      .filter(Boolean);

    // Map question options back to the answers array structure
    const formattedQuestions = questions.map((q) => {
      const answersPayload = (q.options || []).map((optionText, index) => {
        const isThisCorrect = index === q.correctOption;
        return {
          answerId: q.answerIds?.[index] ?? null,
          answerText: optionText,
          correct: isThisCorrect,
          isCorrect: isThisCorrect
        };
      });

      return {
        questionId: q.questionId || null,
        text: q.text,
        score: q.score,
        answers: answersPayload
      };
    });

    const quiz: UpdateQuizData = {
      id: qId,
      title: title,
      difficulty: difficulty,
      topics: topics,
      questions: formattedQuestions as any,
    };

    const url = isEditMode ? `${API}/quizzes/${id}` : `${API}/quizzes`;
    const token = getToken();
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quiz)
      });

      if (!response.ok) {
        throw new Error("Failed to save the quiz.");
      }

      navigate('/quizzes');
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p style={{ padding: '40px', textAlign: 'center' }}>
          Loading quiz data...
        </p>
      </div>
    );
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>{isEditMode ? 'Update Quiz' : 'Create Quiz'}</h2>
        <p>{isEditMode ? 'Update your quiz details and modify questions.' : 'Create your quiz and add your questions.'}</p>
      </div>

      <div className={styles.details}>
        <div className={styles.field}>
          <label>Quiz Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(event) => setTitle(event.target.value)} 
            placeholder="Enter quiz title" 
            required 
          />
        </div>

        <div className={styles.field}>
          <label>Difficulty</label>
          <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Topics</label>
          <input 
            type="text" 
            value={topicInput} 
            onChange={(event) => setTopicInput(event.target.value)} 
            placeholder="Java, Networking, Security" 
          />
          <span className={styles.helpText}>Separate topics with commas.</span>
        </div>

        <div className={styles.field}>
          <label>Number of Questions</label>
          <select value={questionCount} onChange={handleQuestionCountChange}>
            {Array.from({ length: 20 }, (_, index) => index + 1).map(number => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.questions}>
        <div className={styles.questionsHeader}>
          <h3>Questions</h3>
          <span>
            {questions.length} question{questions.length !== 1 && "s"} (Total Points: {questions.reduce((sum, q) => sum + (q.score || 0), 0)})
          </span>
        </div>

        {questions.map((question, index) => (
          <CreateQuestion
            key={index}
            questionNumber={index + 1}
            initialData={question}
            onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
            onRemove={questions.length > 1 ? () => handleRemoveQuestion(index) : undefined}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {isEditMode ? (loading ? 'Updating...' : 'Save Updates') : (loading ? 'Creating...' : 'Create Quiz')}
        </button>
      </div>
    </form>
  );
};