export interface RegisterPayload {
    fullName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    profileImageUrl: File | null;
}
export interface UserPayload extends User {
    createdAt:string;
}
export interface ProfileProps{
    name:string;
    dateOfBirth:string;
    roles:AppRole[],
    bio?:string;
}
export interface MemberListProps {
    title: string;
}
export interface User{
    name: string;
    age:number | null;
    roles: AppRole[];
    dateOfBirth:string;
    authProvider: AuthProvider;
    bio?: string;
    profileImageUrl?: string | undefined;
    email:string;
    enabled:boolean;
}
export interface GuestPayloadResponse{
    token:string;
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

export type AppRole = 'MEMBER' | 'YOUTH_LEADER' | 'GUEST' | 'ADMIN';
export type Providers = 'Google' | 'Facebook' | 'Instagram';
export type EventType = 'GENERAL' | 'MEETING' | 'WORSHIP' | 'URGENT' | 'ACTIVITY';
export type ViewMode = "cards" | "table";
export type ConnectionType = "CONNECT" | 'ERROR' | 'REQUEST' | 'DISCONNECT' | 'TRAFFIC'
export type Status = "ACTIVE" | "INACTIVE"
export type AuthProvider = 'LOCAL' | "OAUTH2"
export type ToastResponse = "success" | "error"

export const appRoleArray = ['MEMBER','YOUTH_LEADER','GUEST','ADMIN']
export const providersArray = ['Google', 'Facebook', 'Instagram'];
export const acceptArray = ['image/png, image/jpeg, image/jpg']
