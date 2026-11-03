import styles from '../module/Popup.module.css'
import type { CustomPopupProps } from '../types/popup';
import { FailureLogo } from './FailureLogo';
import { SuccessLogo } from './SuccessLogo';

export const CustomPopup: React.FC<CustomPopupProps> = ({isOpen,type,title,message,onClose}) => {

    if(!isOpen) return null;

    const isSuccess = type == 'success';

    return(
        <div className={styles.overlay}>
            <div className={`${styles.popupContainer} ${isSuccess ? styles.successBorder : styles.errorBorder}`}>
                
                <div className={`${styles.iconContainer} ${isSuccess ? styles.successText : styles.errorText}`}>
                    {isSuccess ? <SuccessLogo /> : <FailureLogo />}
                </div>

                <h2 className={styles.title}>
                    {title || (isSuccess ? 'Success!' : 'Error!')}
                </h2>
                
                <p className={styles.message}>{message}</p>

                <button 
                    className={`${styles.closeBtn} ${isSuccess ? styles.successBg : styles.errorBg}`} 
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}