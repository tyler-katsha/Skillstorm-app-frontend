import type { CardData, LeaderBoardProps } from "./type";

export const LeaderboardUsers: LeaderBoardProps[] = [
    {rank:'#1',username:'StormRacer',points:2987,level:42},
    {rank:'#2',username:'NavyChill',points:2841,level:39},
    {rank:'#3',username:'QuizWizard',points:2723,level:37},
    {rank:'#4',username:'GreyMatter',points:2689,level:36},
    {rank:'#5',username:'ThunderKnight',points:2545,level:34},
]

export const cardData: CardData[] = [
    {title: 'Leaderboard',text:'Global ranking based on your quiz scores and level progression'},
    {title: 'Quiz Engine', text: 'Questions with options and diffculty levels to challenge yourself'},
    {title: 'Badge System', text: 'Earn achievements for milestones and high scores along the way'}
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
