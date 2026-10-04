import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from '../module/Navigation.module.css';
import { destroyToken } from '../utils/Utils';

export const Navigation = () => {

    const navigate = useNavigate();

    const navigationLink = (route: string, name: string) => (
        (<li key={route}><NavLink to={route} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>{name}</NavLink></li>)
    )

    const handleLogout = async () => {

        try{ 

            destroyToken();
            navigate('/login', { replace: true })
            
        } catch(error){}
    }
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navbarContainer}>

                    <Link
                        to="/"
                        className={styles.logo}
                    >
                        SkillStorm
                    </Link>

                    <ul className={styles.navLinks}>
                        {navigationLink("/", "Home")}
                        {navigationLink("/leaderboard", "Leaderboard")}
                        {navigationLink("/quizzes", "Quizzes")}
                        {navigationLink("/badges", "Badges")}
                        {navigationLink("/profile", "Profile")}
                    </ul>

                    <button
                        type="button"
                        className={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            </nav>
            <hr className={styles.divider} />
        </>
    )
}