import { useEffect, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { OAuthLogin } from '../components/OAuthLogin';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { CustomPopup } from '../modals/CustomPopup';
import styles from '../module/Auth.module.css';
import { type ToastResponse } from '../types/type';
import { API } from '../utils/API';
import { destroyToken } from '../utils/Utils';
import type { RegisterPayload } from '../types/auth';
import { emailRegex } from '../utils/regex';

export const Register = () => {

    useEffect(() => {
        destroyToken();
    }, []);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [doesExist, setDoesExist] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [doesExistEmail, setDoesExistEmail] = useState<boolean | null>(null);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [data, setData] = useState<RegisterPayload>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [popupConfig, setPopupConfig] = useState({
        isOpen: false,
        type: 'success' as ToastResponse,
        message: ''
    });
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const closePopup = () => setPopupConfig(prev => ({ ...prev, isOpen: false }))


    useEffect(() => {
        const trimmedUsername = data.username.trim();

        if (trimmedUsername.length < 3) {
            setDoesExist(null);
            setIsChecking(false);
            return;
        }

        setIsChecking(true);
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${API}/auth/bloom`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ type: 'USERNAME', value: trimmedUsername }),
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error('Network error');
                }

                const isTaken = await response.json();
                setDoesExist(isTaken);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setDoesExist(null);
                }
            } finally {
                setIsChecking(false);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [data.username]);

    useEffect(() => {
        const trimmedEmail = data.email.trim();

        if(!emailRegex.test(trimmedEmail)){
            setDoesExistEmail(null);
            setIsCheckingEmail(false);
            return;
        }

        setIsCheckingEmail(true);
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${API}/auth/bloom`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ type: 'EMAIL', value: trimmedEmail }),
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error('Network error');
                }


                const isTaken = await response.json();
                setDoesExistEmail(isTaken);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setDoesExistEmail(null);
                }
            } finally {
                setIsCheckingEmail(false);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [data.email]);


    const handleFormEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            setPopupConfig({
                isOpen: true,
                type: "error",
                message: "Password are not the same"
            });
            return;
        }

        if (data.password.length < 8) {
            setPopupConfig({
                isOpen: true,
                type: "error",
                message: "Password must contain at least 8 characters."
            });
            return;
        }

        setLoading(true);
        try {

            const trimmedEmail = data.email.trim();
            const trimmedUsername = data.username.trim();

            const payload = {
                ...data,
                email: trimmedEmail,
                username: trimmedUsername
            }
            const response = await fetch(`${API}/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {

                const errMsg = await response.text();
                setPopupConfig({
                    isOpen: true,
                    type: 'error',
                    message: errMsg || 'Registeration Failed'
                });
                return;
            }

            setPopupConfig({
                isOpen: true,
                type: 'success',
                message: 'Registration Successful'
            });

        } catch (error) {
            setPopupConfig({
                isOpen: true,
                type: 'error',
                message: 'Something went wrong. Please try again'
            });
        } finally {
            setLoading(false);
        }

    };

    const isSubmitDisabled = loading || isChecking || isCheckingEmail || doesExist === true || doesExistEmail === true;
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
                    <h1>Register</h1>

                    <div className={styles.inputGroup}>
                        <label>Username:</label>
                        <input type='text' className={styles.inputField} placeholder='CoolKid123' name='username' value={data.username} onChange={handleChange} required />

                        {!isChecking && doesExist === true && (
                            <p className={styles.errorText} style={{ color: '#dc2626', fontSize: '0.85rem' }}>
                                Username is already taken.
                            </p>
                        )}
                    </div>



                    <div className={styles.inputGroup}>
                        <label>Email:</label>
                        <input type='email' className={styles.inputField} placeholder='example@email.com' name='email' value={data.email} onChange={handleChange} required />
                        
                        {!isCheckingEmail && doesExistEmail === true && (
                            <p className={styles.errorText} style={{ color: '#dc2626', fontSize: '0.85rem' }}>
                                Email is already taken.
                            </p>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password:</label>
                        <input type={showPassword ? 'text' : 'password'} className={styles.inputField} placeholder='••••••••' name='password' value={data.password.trim()} onChange={handleChange} required />
                        <button type="button" className={styles.toggleBtn} onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</button>
                    </div>

                    <PasswordRequirements passwordValue={data.password} />
                    <div className={styles.inputGroup}>
                        <label>Confirm Password:</label>
                        <input type={showConfirmPassword ? 'text' : 'password'} className={styles.inputField} placeholder='••••••••' name='confirmPassword' value={data.confirmPassword.trim()} onChange={handleChange} required />
                        <button type="button" className={styles.toggleBtn} onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? 'Hide' : 'Show'}</button>
                    </div>



                    <button type="submit" className={styles.submitBtn} disabled={isSubmitDisabled}>{loading ? "Registering..." : "Register"}</button>

                    <Link className={styles.linkText} to='/login'>Already have an account? Log in</Link>

                </form>

                <OAuthLogin />

            </div>
        </div>

    )
}