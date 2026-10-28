import type { UserAnswerSubmission } from "../../types/quiz";
import type { ProfileTrackerAPIResponse } from "../../types/tracker";
import { API } from "../API";
import { getToken } from "../Utils";

const PROGRESS_STORAGE_KEY = 'skillstorm_quiz_progress';

export const fetchUserTrackerHistory = async (): Promise<ProfileTrackerAPIResponse> => {
    const token = getToken();
    const response = await fetch(`${API}/users/history`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user tracker history');
    }

    return response.json();
};

export const saveUncompletedQuizProgress = async (quizId: number,currentQuestionIndex: number,totalQuestions: number,quiz:UserAnswerSubmission[]) => {

    console.log(quiz);
    const token = getToken();
    const percentage = totalQuestions > 0 ? Math.round((currentQuestionIndex / totalQuestions) * 100) : 0;

    const existing = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) || '{}');
    existing[quizId] = percentage;
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(existing));

    await fetch(`${API}/users/uncompleted/${quizId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            currentQuestion: currentQuestionIndex,
            totalQuestions,
            percentage,
            quiz
        }),
    });
};

export const getSavedQuizPercentage = (quizId: number): number => {
    const existing = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) || '{}');
    return existing[quizId] ?? 0;
};