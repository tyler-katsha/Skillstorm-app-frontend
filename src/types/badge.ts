import type { Kind } from "./type";


export interface BadgeCardProps {
    name: string;
    description: string;
}


export interface BadgeRequest {
    definitionId:string;
    title:string;
    description:string;
    icon:string;
    kind:Kind;
    goal:number;
}

export interface BadgeResponse {
    id: number;
    definitionId:string;
    title:string;
    description:string;
    icon:string;
    kind:Kind;
    goal:number;
    currentProgress:number;
    earned:boolean;
    earnedAt: string;
}

export interface SmallBadgeResponse {
    title: string;
    definitionId: string;
    icon: string;
}

export interface CreateBadgeProps {
    onClose: () => void;
    onRefresh: () => void;
}

export interface BadgeDetailModalProps {
    badge: BadgeResponse;
    isAdminOrEmployee: boolean;
    onClose: () => void;
    onRefresh: () => void;
}