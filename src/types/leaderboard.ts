export interface LeaderBoardUser {
    rank: string;
    xp: number;
    level: number;
    username: string;
    userId: number;
}

export interface LeaderboardProps {
    title?: string;
    users: LeaderBoardUser[];
    isLoading: boolean;
    limit?: number;
    isBackground?: boolean;
}