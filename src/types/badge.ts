import type { PlayerHistory } from "./player";

export interface Badge {
    name: string;
    description: string;
    // profile url in the future
}

export interface BadgeCardProps {
    name: string;
    description: string;
}

export interface BadgePageProps{
    results?:PlayerHistory[];
}
