import type { Answer } from "./answer";

export interface Question {
    score: number;
    text: string;
    answers: Answer[];
}
export interface QuestionData{
    text: string,
    options: string[],
    correctOption: number
}