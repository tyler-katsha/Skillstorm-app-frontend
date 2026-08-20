import type { CardData, LeaderBoardUser } from "./type";

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