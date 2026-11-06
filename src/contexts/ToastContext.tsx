import { createContext, type ReactNode, useState, useCallback, useContext } from "react";
import { Toast } from "../modals/Toast";
import type { PartialToast, ToastContextType } from "../types/popup";
import type { ToastResponse } from "../types/type";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<PartialToast | null>(null);

    const showToast = useCallback((message: string, type: ToastResponse) => {
        setToast({ message, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={hideToast} 
                />
            )}
        </ToastContext.Provider>
    );

};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};