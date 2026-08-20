import type { ReactNode } from "react";

export interface RegisterPayload {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface UserProps{
    username: string;
    email:string;
    xp:number;
    roles:AppRole[]
    attempts?:Attempt[];
    badges?:Badge[];
}

export interface Attempt{
    attemptId:number;
    score:number;
    quiz:Quiz;
    time:string;
}

export interface Quiz{
    title: string;
    difficulty:string;
    topicNames:string[];
    questions:Question[];
}

export interface Question{
    text:string;
    score:number;
    answers:Answer[];
}

export interface Answer{
    text:string;
    isCorrect:boolean;
}
export interface Badge{
    name:string;
    description:string;
    // profile url in the future
}
export interface Props{
    children?: ReactNode;
    title?:string;
    message?:string;
}

export interface State{
    hasError:boolean;
    error?:Error;
}
export interface LeaderBoardUser{
    rank: string;
    points: number;
    level:number;
    username:string;
}

export interface LeaderboardProps{
    title?:string;
    users: LeaderBoardUser[];
    isLoading:boolean;
    limit?:number;
    isBackground?:boolean;
}
export interface CardProps{
    width?:string | number;
    height?:string | number;
    title:string;
    text:string;
    numOfQuestions?:number;
}
export interface CardData{
    title:string;
    text:string;
    numOfQuestions:number;
}
export interface CardGridProps{
    width?:string | number;
    height?: string | number;
    cardData:CardData[]
}
export interface PasswordRequirementsProps{
    passwordValue: string;
}
export interface RuleProps{
    label:string;
    met:boolean;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface ProtectedRouteProps{
    children?: React.ReactNode;
}

export type AppRole = 'USER' | 'EMPLOYEE' | 'ADMIN';
export type Providers = 'Google' | 'Facebook' | 'Instagram';
export type EventType = 'GENERAL' | 'MEETING' | 'WORSHIP' | 'URGENT' | 'ACTIVITY';
export type ViewMode = "cards" | "table";
export type ConnectionType = "CONNECT" | 'ERROR' | 'REQUEST' | 'DISCONNECT' | 'TRAFFIC'
export type Status = "ACTIVE" | "INACTIVE"
export type AuthProvider = 'LOCAL' | "OAUTH2"
export type ToastResponse = "success" | "error"

export const appRoleArray = ['USER','EMPLOYEE','ADMIN']
export const providersArray = ['Google', 'Facebook', 'Instagram'];

export const errorMessages: Record<string, string> = {
        account_disabled: "Your account has been disabled. Check email for verification link.",
        invalid_credentials: "Incorrect email or password.",
        email_not_verified: "Please verify your email before signing in.",
        oauth_failed: "Google authentication failed. Please try again.",
        oauth_cancelled: "Google sign-in was cancelled.",
        token_missing: "Session expired",
        server_error: "Something went wrong. Please try again later."
};