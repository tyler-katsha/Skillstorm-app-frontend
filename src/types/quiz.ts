import type { QuestionData } from "./question";

export interface QuizProps {
    title: string;
    difficulty: string;
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
    topicNames: string[];
    questions: QuestionData[];
};

export interface CreateQuizProps{
    onSubmit: (quiz:QuizData) => void;
    initialData?: QuizProps;
}