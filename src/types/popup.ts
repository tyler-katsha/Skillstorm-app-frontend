import type { BadgeResponse } from "./badge";
import type { ToastResponse } from "./type";

export interface CustomPopupProps{
    isOpen:boolean;
    type: 'success' | 'error';
    title?:string;
    message:string;
    onClose: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    footer?: React.ReactNode;
}

export interface ToastContextType {
  showToast: (message:string, type:ToastResponse) => void;
}
export interface ToastProps {
  message: string;
  type: ToastResponse;
  onClose: () => void;
  duration?: number;
}

export interface PartialToast {
  message: string;
  type: ToastResponse;
}

export interface BadgeToastProps {
    badge: BadgeResponse;
    onClose: () => void;
}