import { useState } from 'react';
import googleIcon from '../../assets/google-icon.png';
import styles from '../../module/Auth.module.css';
import { OAUTH_API } from '../../utils/API';
import { removeAll } from '../../utils/Utils';
import { DEFAULT_POPUP } from '../../types/default';

export const OAuthLogin = () => {
    const [_popupConfig, setPopupConfig] = useState(DEFAULT_POPUP);

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