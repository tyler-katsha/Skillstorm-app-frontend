import type { ReactNode } from "react";

export interface Props {
    children?: ReactNode;
    title?: string;
    message?: string;
}

export interface State {
    hasError: boolean;
    error?: Error;
}

export interface ErrorPageProps {
  code?: string | number;
  title?: string;
  message?: string;
}

export const errorMessages: Record<string, string> = {
    account_disabled: "Your account has been disabled. Check email for verification link.",
    invalid_credentials: "Incorrect email or password.",
    email_not_verified: "Please verify your email before signing in.",
    oauth_failed: "Google authentication failed. Please try again.",
    oauth_cancelled: "Google sign-in was cancelled.",
    token_missing: "Session expired",
    server_error: "Something went wrong. Please try again later.",
};

export const ERROR_MESSAGES: Record<string, ErrorPageProps> = {
    SERVER_OFFLINE: {
        code: '503',
        title: 'Server Offline',
        message: 'We are currently unable to reach the servers. Please check your internet connection or try again later.'
    },
    INTERNAL_SERVER_ERROR: {
        code: '500',
        title: 'Server Connection Lost',
        message: 'We are having trouble communicating with our servers. Please return to the login screen to restore your session.'
    },
    
    SESSION_EXPIRED: {
        code: '401',
        title: 'Session Expired',
        message: 'Your authentication token has expired or is invalid. Please log in again to access this page.'
    },
    FORBIDDEN: {
        code: '403',
        title: 'Access Denied',
        message: 'You do not have the required permissions to view this page or perform this action.'
    },

    LOAD_DATA_FAILED: {
        code: '400',
        title: 'Failed to Load Data',
        message: 'We could not retrieve the necessary data for this page. The requested resource might be temporarily unavailable.'
    },
    NOT_FOUND: {
        code: '404',
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist or has been moved.'
    },

    DELETE_FAILED: {
        code: '409',
        title: 'Deletion Failed',
        message: 'Unable to delete the selected quiz or badge. It may be locked, currently in use, or you lack the necessary permissions.'
    },

    UPDATE_FAILED: {
        code: '409',
        title: 'Deletion Failed',
        message: 'Unable to update the selected quiz or badge. It may be locked, currently in use, or you lack the necessary permissions.'
    },
    
    RATE_LIMITED: {
        code: '429',
        title: 'Too Many Requests',
        message: 'You are submitting requests too quickly. Please wait a few moments before trying again.'
    }
} as const;

export type ErrorType = keyof typeof ERROR_MESSAGES;