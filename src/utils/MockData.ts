import type { CardData, LeaderBoardUser, UserProps } from "./type";

export const topStormers: LeaderBoardUser[] = [
    {rank:'1',username:'StormRacer',points:2987,level:42},
    {rank:'2',username:'NavyChill',points:2841,level:39},
    {rank:'3',username:'QuizWizard',points:2723,level:37},
    {rank:'4',username:'GreyMatter',points:2689,level:36},
    {rank:'5',username:'Tyler',points:2545,level:34},
    {rank:'6',username:'Taylor',points:2400,level:32},
    {rank:'7',username:'Alex',points:2390,level:31},
    {rank:'8',username:'Chris',points:2353,level:30},
    {rank:'9',username:'Jordan',points:2231,level:28},
    {rank:'10',username:'Pat',points:2000,level:25}
]

export const cardData: CardData[] = [
    {title: 'Leaderboard',text:'Global ranking based on your quiz scores and level progression', numOfQuestions:0},
    {title: 'Quiz Engine', text: 'Questions with options and diffculty levels to challenge yourself', numOfQuestions:0},
    {title: 'Badge System', text: 'Earn achievements for milestones and high scores along the way', numOfQuestions:0}
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

type QuestionData = {
    text: string,
    options: string[],
    correctOption: number
}

type QuizData = {
    title: string,
    questions: QuestionData[]
};

export const sampleQuiz: QuizData = {
    "title": "Polymorphism in Java",
    "questions": [
        {
            "text": "Which of these cannot be inherited by a subclass?",
            "options": ["The superclass's public instance methods", "The superclass's private fields", "The superclass's protected fields", "The superclass's final static methods"],
            "correctOption": 1
        },
        {
            "text": "The method `makeSound` is defined in both `Animal` and a subclass of `Animal`, `Dog`. Which polymorphism technique does this method illustrate?",
            "options": ["overriding", "overloading", "overflowing", "overwriting"],
            "correctOption": 0
        },
        {
            "text": "Which of the following statements is true of a class declared `final`?",
            "options": ["Final classes cannot have instance methods", "Final classes can only have final members", "Final classes cannot have static methods", "Final classes cannot be extended"],
            "correctOption": 3
        },
        {
            "text": "True or false: Abstract methods must have method bodies.",
            "options": ["True", "False"],
            "correctOption": 1
        },
        {
            "text": "Which Java keyword can be used in a class declaration to derive a subclass from an existing class?",
            "options": ["final", "int", "extends", "class", "implements", "new"],
            "correctOption": 2
        },
        {
            "text": "Which Java keyword can be used in a method declaration to prevent a method from being overriden in a subclass?",
            "options": ["public", "static", "final", "abstract"],
            "correctOption": 2
        },
    ]
}

export const sampleUser: UserProps = {
    username: "john_doe",
    email: "john.doe@example.com",
    xp: 1340,
    roles: ["USER"],
    options: {
        quick_select: false,
    },
    attempts: [],
    badges: [],
    createdAt: new Date().toISOString(),
};
// TODO: Extrapolate a function or sequence for `xpGoal`.
// `xpGoal` should not be stored with the user's details. 
// Instead, it should be easily calculable as a function of the user's level. 

export const badgeData: CardData[] = [
    {title: 'Rookie Stormer', text: 'Complete your first Quiz', numOfQuestions:0},
    {title: 'Top 10 Percent', text: 'Reach the Top 10 percent on the leaderboard', numOfQuestions:0},
    {title: 'Weekly Champion', text: 'Claim the number 1 spot weekly', numOfQuestions:0},
    {title: 'Quiz Master', text: 'Score perfectly on five quizzes', numOfQuestions:0},
]

export const quizData: CardData[] = [
    {title: 'Data Structure', text: 'Diffculty: Hard', numOfQuestions: 12},
    {title: 'SQL Fundamentals', text: 'Diffculty: Medium', numOfQuestions: 10},
    {title: 'ERD and DB Design', text: 'Diffculty: Hard', numOfQuestions: 8},
    {title: 'JavaScript Basics', text: 'Diffculty: Easy', numOfQuestions: 15},
]

export const statsData = {quizzesTaken: 147, quizzesWon: 23, streak:12}

export const challengeData = [
  { topic: 'Data Structures', percent: '78%' },
  { topic: 'Algorithms', percent: '64%' },
  { topic: 'Database Design', percent: '82%' },
  { topic: 'System Architecture', percent: '45%' },
  { topic: 'API & Integration', percent: '91%' },
  { topic: 'Security & Auth', percent: '56%' },
]