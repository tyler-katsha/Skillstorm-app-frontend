import React, { useEffect } from 'react';
import styles from '../module/BadgeToast.module.css';
import type { BadgeToastProps } from '../types/popup';


export const BadgeToast: React.FC<BadgeToastProps> = ({ badge, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.toastContainer}>
            <div className={styles.iconWrapper}>{badge.icon}</div>
            <div className={styles.content}>
                <span className={styles.eyebrow}>NEW BADGE UNLOCKED!</span>
                <h4 className={styles.title}>{badge.title}</h4>
                <p className={styles.description}>{badge.description}</p>
            </div>
            <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
                ✕
            </button>
            <div className={styles.progressBar}></div>
        </div>
    );
};