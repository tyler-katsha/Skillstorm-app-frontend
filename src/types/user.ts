import type { AppRole } from "./type";
import type { OptionStateT } from "../utils/Utils";
import type { Attempt } from "./attempt";
import type { Badge } from "./badge";

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