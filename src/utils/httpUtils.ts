import type { NavigateFunction } from 'react-router-dom';
import { destroyToken, removeAll } from './Utils';
import type { ToastResponse } from '../types/type';

export function handleHttpErrors(status: number, navigate: NavigateFunction,showToast: (message: string, type: ToastResponse) => void): boolean {

    if(status === 401 || status === 404) {
        removeAll();
        destroyToken();

        const message = status === 401 ? "Your session has expired. Please log in again." : "The requested resource was not found. Please log in to continue.";

    showToast(message,'error');

    navigate('/login', {replace : true});

    return true;
    }
    return false;
}