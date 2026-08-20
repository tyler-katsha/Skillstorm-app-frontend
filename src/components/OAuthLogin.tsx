import styles from '../module/Auth.module.css'
import googleIcon from '../assets/google-icon.png';
import { useState } from 'react';
import type { ToastResponse } from '../utils/type';
import { OAUTH_API } from '../utils/API';
import { removeAll } from '../utils/Utils';

export const OAuthLogin = () => {
    const [_popupConfig, setPopupConfig] = useState({
        isOpen: false,
        type: 'success' as ToastResponse,
        message: ''
    });

    const handleOAuth2Login = (provider: string) => {
        removeAll();
        
        try {
            window.location.href = `${OAUTH_API}/${provider}`
        } catch (err) {
            setPopupConfig({
                isOpen: true,
                type: 'error',
                message: 'Resource not found'
            });
        }
    };
    return (
        <>
            <div className={styles.divider}>OR CONTINUE WITH</div>

            <div className={styles.socialGrid}>
                <button className={styles.socialBtn} onClick={() => handleOAuth2Login('google')}><img src={googleIcon} alt='Login with Google' /></button>
            </div>

        </>
    )
}