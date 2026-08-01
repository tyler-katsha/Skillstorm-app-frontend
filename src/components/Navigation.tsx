import { Link } from 'react-router-dom';
import styles from '../module/Navigation.module.css';

export const Navigation = () => {

    const navigationLink = (route: string, name: string) => (
        (<li><Link to={route}>{name}</Link></li>)
    )

    return (
        <nav className={styles.navBar}>
            <div className={styles.navBarLeft}>
                SkillStorm
            </div>

            <div className={styles.navBarRight}>
                <ul className={styles.navLinks}>
                    {/* Add the Route's for the leaderboard, quizzes, badges and profile page in App.tsx with the pages */}
                    {navigationLink("/", "home")}
                    {navigationLink("/learderboard", "Leaderboard")}
                    {navigationLink("/quizzes", "Quizzes")}
                    {navigationLink("/badges", "Badges")}
                    {navigationLink("/profile", "Profile")}
                    {/* These are just test links delete once development is far enough*/}
                    {navigationLink("/login", "Login")}
                    {navigationLink("/register", "Register")}
                </ul>
            </div>
        </nav>
    )
}