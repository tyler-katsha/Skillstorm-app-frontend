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