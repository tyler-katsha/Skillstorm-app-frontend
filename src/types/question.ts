import type { Answer } from "./answer";

export interface Question {
    score: number;
    text: string;
    answers: Answer[];
}
export interface QuestionData {
    text: string,
    options: string[],
    correctOption: number
}

export interface CreateQuestionProps {
    questionNumber: number;
    initialData?: QuestionData;
    onChange: (question: QuestionData) => void;
    onRemove?: () => void;
}

export const DEFAULT_QUESTION: QuestionData = {
    text: "",
    options: ["", "", "", ""],
    correctOption: 0
}
