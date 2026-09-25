export interface PasswordRequirementsProps {
    passwordValue: string;
}

export interface RuleProps {
    label: string;
    met: boolean;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ProtectedRouteProps {
    children?: React.ReactNode;
}

export interface RegisterPayload {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}