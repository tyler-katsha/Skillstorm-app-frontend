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
