import type { QuizProps } from "./quiz";

export interface Attempt {
    attemptId: number;
    score: number;
    quiz: QuizProps;
    time: string;
}
