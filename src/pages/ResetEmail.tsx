import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomPopup } from '../modals/CustomPopup';
import styles from '../module/Auth.module.css';
import { API } from '../utils/API';
import { setupEmailTrue, setupIsGuest } from '../utils/Utils';
import { DEFAULT_POPUP } from '../types/default';

export const ResetEmail = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [popupConfig, setPopupConfig] = useState(DEFAULT_POPUP);


    const closePopup = () => setPopupConfig(prev => ({ ...prev, isOpen: false }));
    const loginPage = () => navigate('/login');

    const handleFormEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setupEmailTrue()
        setupIsGuest();
        setLoading(true);


        try {
            const response = await fetch(`${API}/auth/email?email=${email}`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
            })


            if (!response.ok) {
                setPopupConfig({
                    isOpen: true,
                    type: 'error',
                    message: 'Unable to send email'
                })
                return;
            }

            setPopupConfig({
                isOpen: true,
                type: 'success',
                message: 'Successfully sent email. Please check your inbox.'
            })

            navigate('/login')


        } catch (err) {
            setPopupConfig({
                isOpen: true,
                type: 'error',
                message: 'Network issue occurred'
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className={styles.pageWrapper}>

            <CustomPopup
                isOpen={popupConfig.isOpen}
                type={popupConfig.type}
                message={popupConfig.message}
                onClose={closePopup}
            />

            <div className={styles.formContainer}>
                <form className={styles.loginForm} onSubmit={handleFormEvent}>
                    <h1>Reset Password</h1>


                    <div className={styles.inputGroup}>
                        <label>Enter email:</label>
                        <input type='email' className={styles.inputField} placeholder='example@gmail.com' name='email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <button type="button" onClick={loginPage} className={styles.submitBtn} disabled={loading}>Cancel</button>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? "Sending..." : "Send email"}</button>

                </form>
            </div>
        </div>
    )
}