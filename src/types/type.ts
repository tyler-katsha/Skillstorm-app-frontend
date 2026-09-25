
export type AppRole = 'USER' | 'EMPLOYEE' | 'ADMIN';
export type Providers = 'Google' | 'Facebook' | 'Instagram';
export type EventType = 'GENERAL' | 'MEETING' | 'WORSHIP' | 'URGENT' | 'ACTIVITY';
export type ViewMode = "cards" | "table";
export type ConnectionType = "CONNECT" | 'ERROR' | 'REQUEST' | 'DISCONNECT' | 'TRAFFIC'
export type Status = "ACTIVE" | "INACTIVE";
export type AuthProvider = 'LOCAL' | "OAUTH2";
export type ToastResponse = "success" | "error";
export type GameEventType = "WAITING_FOR_OPPONENT" | "GAME_STARTED";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Filter = 'All' | 'Earned' | 'Locked';

export const appRoleArray = ['USER', 'EMPLOYEE', 'ADMIN']
export const providersArray = ['Google', 'Facebook', 'Instagram'];
export const filterArray = ['All', 'Earned', 'Locked'];

