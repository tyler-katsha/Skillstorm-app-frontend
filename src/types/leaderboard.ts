export interface LeaderBoardUser {
    rank: string;
    points: number;
    level: number;
    username: string;
}

export interface LeaderboardProps {
    title?: string;
    users: LeaderBoardUser[];
    isLoading: boolean;
    limit?: number;
    isBackground?: boolean;
}