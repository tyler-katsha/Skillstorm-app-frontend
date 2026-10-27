import type { AppRole } from "./type";
import type { OptionStateT } from "../utils/Utils";
import type { Attempt } from "./attempt";
import type { Badge } from "./badge";
import type { Dispatch, SetStateAction } from "react";

export interface UserProps {
    username: string;
    email: string;
    xp: number;
    roles: AppRole[];
    options: UserOptions;
    attempts?: Attempt[];
    badges?: Badge[];
    createdAt: string;
}

export interface ProfileCompProps {
    name: string;
    profileImageUrl: string | undefined;
    link?: boolean;
}

export interface QuestionOptionProps {
    label: string;
    selected: boolean;
    state: OptionStateT;
    myOnClick: () => void;
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