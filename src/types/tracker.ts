import type { UserProfile } from "./user";

export interface QuizAttemptResponse {
    id?: number;
    quizId: number;
    quizTitle?: string;
    attemptNumber: number;
    questionsAnswered: number;
    correctAnswers: number;
    timeSpentSeconds: number;
    gainedXp: number;
    isQuizWon: boolean;
    isPerfectQuiz: boolean;
    completedAt: string;
}

export interface QuizSummary {
    quizId?: number;
    id?: number;
    title: string;
    difficulty: string;
    topics?: string[];
    questions?: any[];
}

export interface UserTrackerResponse {
    id: number;
    userId: number;
    rank:number;
    username: string;
    totalXp: number;
    xpToNewLevel: number;
    currentLevel: number;
    streak: number;
    longestStreak: number;
    quizzesTaken: number;
    quizzesWon: number;
    perfectQuizzes: number;
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;
    totalTimeSpentSeconds: number;
    lastActiveDate: string;
    accuracyRate: number;
    winRate: number;
    uncompletedQuizIds: number[];
    completedQuizIds: number[];
    bookmarkedQuizIds: number[];
    attemptRecords: QuizAttemptResponse[];
    completedQuizzes: QuizSummary[];
    uncompletedQuizzes: QuizSummary[];
    bookmarkedQuizzes: QuizSummary[];
}

export interface ProfileTrackerAPIResponse {
    user: UserProfile;
    userTrackerResponse: UserTrackerResponse;
    rank: number;
}
export interface ProfileHistoryState {
    profile: UserProfile | null;
    tracker: UserTrackerResponse | null;
    rank: number | null;
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}