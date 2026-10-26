import type { Answer } from "./answer";

export interface QuestionPayload {
  questionId?: number | null;
  score: number;
  text: string;
  answers: Answer[];
}

export interface QuestionData {
  questionId?: number;
  text: string;
  score: number;
  correctOption: number;
  options: string[]; // Used by CreateQuestion form inputs
  answers?: Answer[]; // Received from API
  answerIds?: number[];
}

export interface CreateQuestionProps {
  questionNumber: number;
  initialData?: QuestionData;
  onChange: (question: QuestionData) => void;
  onRemove?: () => void;
}

export const DEFAULT_QUESTION: QuestionData = {
  text: "",
  correctOption: 0,
  score: 10,
  options: ["", "", "", ""],
};