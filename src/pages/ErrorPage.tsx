import styles from '../module/ErrorPage.module.css';
import type { ErrorPageProps } from '../types/error';

export const ErrorPage: React.FC<ErrorPageProps> = ({ code = '500', title = 'Server Connection Lost', message = 'We are having trouble communicating with our servers. Please return to the login screen to restore your session.' }) => {

    const handleGoToLogin = () => {
        window.location.href = '/login';
    };

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <div className={styles.badge}>Status {code}</div>

                <div className={styles.iconWrapper} aria-hidden="true">
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.75"
                        stroke="currentColor"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                        />

                        <path
                            strokeLinecap="round"
                            d="M12 7.5v4.5"
                        />

                        <circle
                            cx="12"
                            cy="16.5"
                            r="1"
                            fill="currentColor"
                            stroke="none"
                        />
                    </svg>
                </div>

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{message}</p>

                <div className={styles.actionGroup}>
                    <button type="button" className={styles.primaryBtn} onClick={handleGoToLogin}>Back to Login</button>
                    <button type="button" className={styles.secondaryBtn} onClick={handleRetry}>Try Reconnecting</button>
                </div>
            </section>
        </main>
    );
};