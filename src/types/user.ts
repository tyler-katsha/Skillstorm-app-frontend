import type { AppRole, AuthProvider } from "./type";
import type { OptionStateT } from "../utils/Utils";
import type { Attempt } from "./attempt";
import type { Dispatch, SetStateAction } from "react";

export interface UserProps {
    username: string;
    email: string;
    xp: number;
    level: number;
    roles: AppRole[];
    options: UserOptions;
    attempts?: Attempt[];
    createdAt: string;
    authProvider:AuthProvider;
}

export interface ProfileCompProps {
    name: string;
}

export interface QuestionOptionProps {
    label: string;
    selected: boolean;
    state: OptionStateT;
    myOnClick: () => void;
    disabled?: boolean;
}

export interface UserOptions {
    quick_select: boolean;
}

export interface UserContextType {
  user: UserProps | null;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthentication: Dispatch<SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
  updateUser: (newData: UserProps) => void;
  updateUserStats: (newXp: number, newLevel?: number) => void;
  logout: () => void;
}

export interface UserProfile {
    userId: number;
    username: string;
    email: string;
    level: number;
    xp: number;
    roles: string[];
    authProvider: string;
}

export interface ProfileDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}