import type { CardData, LeaderBoardProps } from "./type";

export const LeaderboardUsers: LeaderBoardProps[] = [
    { rank: '#1', username: 'StormRacer', points: 2987, level: 42 },
    { rank: '#2', username: 'NavyChill', points: 2841, level: 39 },
    { rank: '#3', username: 'QuizWizard', points: 2723, level: 37 },
    { rank: '#4', username: 'GreyMatter', points: 2689, level: 36 },
    { rank: '#5', username: 'ThunderKnight', points: 2545, level: 34 },
]

export const cardData: CardData[] = [
    { title: 'Leaderboard', text: 'Global ranking based on your quiz scores and level progression' },
    { title: 'Quiz Engine', text: 'Questions with options and diffculty levels to challenge yourself' },
    { title: 'Badge System', text: 'Earn achievements for milestones and high scores along the way' }
]

/*
 * ABOUT SampleData.tsx:
 * This webpage is only an implementation of the UI design. 
 * It does not have any backend interface capabilities. 
 * Therefore, sample values are used to show what the UI may look like
 *  when actual user content is used.
 * Those sample values are being kept in this file so that it will be easier
 * to replace the sample data with results from an actual database.
 */
export type QuizData = {
    quiz_id: number,
    title: string,
    difficulty: "Easy" | "Medium" | "Hard",
    questions: {
        question_text: string,
        score: number,
        answers: {
            answer_text: string,
            is_correct: boolean,
        }[]
    }[]
}

export const sampleQuiz: QuizData = { "quiz_id": 1, "title": "Java Basics Quiz", "difficulty": "Easy", "questions": [
    { "question_text": "What is Java?", "score": 10, "answers": [
        { "answer_text": "Compiled language", "is_correct": true }, 
        { "answer_text": "Interpreted language", "is_correct": false }, 
        { "answer_text": "Scripting language", "is_correct": false }, 
        { "answer_text": "Markup language", "is_correct": false }
    ] }, 
    { "question_text": "What is JVM?", "score": 10, "answers": [
        { "answer_text": "Java Virtual Machine", "is_correct": true }, 
        { "answer_text": "Java Visual Model", "is_correct": false }, 
        { "answer_text": "Java Virtual Module", "is_correct": false }, 
        { "answer_text": "Java Variable Manager", "is_correct": false }
    ] }, 
    { "question_text": "What is Spring Boot?", "score": 10, "answers": [
        { "answer_text": "Framework", "is_correct": true }, 
        { "answer_text": "Library", "is_correct": false }, 
        { "answer_text": "Database", "is_correct": false }, 
        { "answer_text": "IDE", "is_correct": false }
    ] }
] };



export const sampleUser = {
    username: "john_doe",
    user_id: crypto.randomUUID(),
    level: 2,
    xp: 1340,
    xpGoal: 2000,
    options: {
        quick_select: false,
    }
}
// TODO: Extrapolate a function or sequence for `xpGoal`.
// `xpGoal` should not be stored with the user's details. 
// Instead, it should be easily calculable as a function of the user's level. 
