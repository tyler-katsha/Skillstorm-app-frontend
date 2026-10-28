import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { API } from '../utils/API';
import { getToken } from '../utils/Utils';
import type { QuizContextType, QuizProps } from '../types/quiz';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [quizzes, setQuizzes] = useState<QuizProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = useCallback(async () => {

        const token = getToken();
        try {
            const response = await fetch(`${API}/quizzes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch quizzes');

            const data = await response.json();
            setQuizzes(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const getQuizById = (id: number) => quizzes.find(q => q.id === id);

    const refreshQuizzes = async (id: number) => {
        setQuizzes(prev => prev.filter(q => q.id !== id));
    }
    return (
        <QuizContext.Provider value={{ quizzes, loading, error, getQuizById, refreshQuizzes }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};