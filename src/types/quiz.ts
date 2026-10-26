import type { QuestionData, QuestionPayload } from "./question";
import type { DifficultyLevel } from "./type";
import type { UserProps } from "./user";

export interface QuizProps {
    id: number;
    title: string;
    difficulty: DifficultyLevel;
    topicNames: string[];
    questions: QuestionData[];
}
export interface SubmitButtonProps {
    label: string;
    disabled?: boolean;
    myOnClick: () => void;
}

export interface ProgressbarsProps {
    answered: number;
    total: number;
    currentLevel: number;
    currentXp: number;
    nextLevelXp: number;
}

export interface CongratsProps {
    correct: number;
    total: number;
    xpGained: number;
}

export interface QuizData{
    title: string,
    difficulty: string;
    topics: string[];
    questions: QuestionData[];
    email?:string;
};

export interface UpdateQuizData extends Omit<QuizData, "questions">{
    id:number;
    questions: QuestionPayload[];
}
export interface CreateQuizProps{
    onSubmit: (quiz:QuizData) => void;
    initialData?: QuizProps;
}

export interface QuizCompProps {
  sampleQuiz: QuizProps;
  sampleUser: UserProps | null;
  onQuizDeleted?: (quizId: string | number) => void; // Optional callback for the parent
  onBack?: () => void;
}

export interface SubmissionResult {
    scoreEarned: number;
    correctCount: number;
    totalQuestions: number;
    currentXp: number;
    currentLevel: number;
    leveledUp: boolean;
}

export interface UserAnswerSubmission {
  questionId: number;
  selectedAnswerId: number;
}

export interface QuizSubmissionPayload {
  timeSpentSeconds?: number;
  answers: UserAnswerSubmission[];
}

export interface QuizResultsProps {
  quiz: QuizProps;
  result: SubmissionResult | null;
  fallbackCorrect: number;
  fallbackScore: number;
  timeSpentSeconds: number;
  userSubmissions: UserAnswerSubmission[];
  initialUserXp: number;
  initialUserLevel: number;
  onRetry: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}