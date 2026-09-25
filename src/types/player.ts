export interface PlayerSlot {
    action?: string;
    id?: string;
    username: string;
    avatarUrl?: string;
    quizzesTaken: number;
    quizzesWon: number;
    streak: number;
    isHost?: boolean;
    isReady?: boolean;
    isGuest?: boolean;
    score?: number;
    ranking?: number;
    currentQuestionIndex?: number;
}

export interface PlayerCardProps {
    player: PlayerSlot | null;
    isHost?: boolean;
    isCurrentUser?: boolean;
    isReady?: boolean;
    onToggleReady?: () => void;
    placeholderText?: string;
}
export interface PlayerHistory{
    id: string; 
    playedAt: string; 
    topic: string; 
    mode: 'Duel' | 'Solo Quiz'; 
    score: number; 
    total: number; 
    outcome: 'Won' | 'Lost' | 'Completed'; 
    opponent?: string
}