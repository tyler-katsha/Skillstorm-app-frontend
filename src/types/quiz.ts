import type { Dispatch, SetStateAction } from "react";
import type { BadgeResponse } from "./badge";
import type { QuestionData, QuestionPayload } from "./question";
import type { DifficultyLevel } from "./type";

export interface QuizProps {
    id: number;
    title: string;
    difficulty: DifficultyLevel;
    topicNames: string[];
    questions: QuestionData[];
}

export interface QuizComponentProps {
  sampleQuiz: QuizProps | any;
  onBack: () => void;
}

export interface UncompletedQuizProps {
    pct:number;
    quiz: QuizData;
    qId: number;
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

export interface PartialQuizSubmissionPayload extends Omit<QuizSubmissionPayload,'timeSpentSeconds'> {
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
  earnedToasts: BadgeResponse[];
  setEarnedToasts: Dispatch<SetStateAction<BadgeResponse[]>>
}

export interface QuizContextType {
  quizzes: QuizProps[];
  loading: boolean;
  error: string | null;
  getQuizById: (id: number) => QuizProps | undefined;
  refreshQuizzes: (id: number) => Promise<void>;
}

export interface SmallQuizResponse {
    topicName: string;
    difficulty: string | DifficultyLevel;
    numOfQuizForTopic: number;
}