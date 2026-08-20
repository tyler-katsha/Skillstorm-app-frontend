import { Link, NavLink } from 'react-router-dom';
import styles from '../module/Navigation.module.css';

export const Navigation = () => {

    const navigationLink = (route: string, name: string) => (
        (<li key={route}><NavLink to={route} className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ""}`}>{name}</NavLink></li>)
    )

    return (
        <>
        <nav className={styles.navBar}>
            <div className={styles.navbarContainer}>

                <Link to='/' className={styles.logo}>
                SkillStorm
                </Link>

                <ul className={styles.navLinks}>
                    {/* Add the Route's for the leaderboard, quizzes, badges and profile page in App.tsx with the pages */}
                    {navigationLink("/", "home")}
                    {navigationLink("/leaderboard", "Leaderboard")}
                    {navigationLink("/quizzes", "Quizzes")}
                    {navigationLink("/badges", "Badges")}
                    {navigationLink("/profile", "Profile")}
                    {/* These are just test links delete once development is far enough*/}
                    {navigationLink("/login", "Login")}
                    {navigationLink("/register", "Register")}
                </ul>
            </div>
        </nav>
        <hr className={styles.divider}/>
        </>
    )
}