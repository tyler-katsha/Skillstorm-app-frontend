import type { Answer } from "./answer";

export interface QuestionPayload {
  questionId?: number | null;
  score: number;
  text: string;
  description?: string;
  answers: Answer[];
}

export interface QuestionData {
  questionId?: number;
  text: string;
  score: number;
  correctOption: number;
  answers: Answer[];
  description?: string;
  options: string[];
}

export interface CreateQuestionProps {
  questionNumber: number;
  initialData?: QuestionData;
  onChange: (question: QuestionData) => void;
  onRemove?: () => void;
}
