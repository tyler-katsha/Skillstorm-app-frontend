import styles from '../module/ConfirmDeleteModal.module.css';
import type { ConfirmDeleteModalProps } from '../types/popup';

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({isOpen,onClose,onConfirm,title = 'Confirm Deletion',message = 'Are you sure you want to delete this?', isLoading = false}) => {

    if(!isOpen) return null;

    return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        
        <div className={styles.buttonGroup}>
          <button  className={styles.yesButton}  onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Yes"}
          </button>
          <button  className={styles.noButton}  onClick={onClose}  disabled={isLoading}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}