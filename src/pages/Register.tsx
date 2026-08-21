import { Link } from 'react-router-dom';
import styles from '../module/Auth.module.css';
import { useEffect, useState, type ChangeEvent } from 'react';
import { API } from '../utils/API';
import { CustomPopup } from '../modals/CustomPopup';
import { type RegisterPayload, type ToastResponse } from '../utils/type';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { OAuthLogin } from '../components/OAuthLogin';
import { destroyToken } from '../utils/Utils';

export const Register = () => {

    useEffect(() => {
        destroyToken();
    }, []);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const handleFormEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

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

        try {
            const response = await fetch(`${API}/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data),
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
                        <input type='text' className={styles.inputField} placeholder='CoolKid123' name='username' value={data.username.trim()} onChange={handleChange} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email:</label>
                        <input type='email' className={styles.inputField} placeholder='example@email.com' name='email' value={data.email.trim()} onChange={handleChange} required />
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



                    <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? "Registering..." : "Register"}</button>

                    <Link className={styles.linkText} to='/login'>Already have an account? Log in</Link>

                </form>

                <OAuthLogin />

            </div>
        </div>

    )
}