import styles from '../../module/Navigation.module.css';
import { NavigationLink } from './NavigationLink';
export const NavigationRegistry = () => {
    
    const mapper: Record<string,string> = {
        '/': 'Home',
        '/leaderboard': 'Leaderboard',
        '/quizzes': 'Quizzes',
        '/badges': 'Badges',
        '/profile': 'Profile',
        '/homeSkel': 'HomeSkel',
    }

    return (
        <ul className={styles.navLinks}>
            {Object.entries(mapper).map(([route,name]) => (
                <NavigationLink key={route} route={route} name={name}/>
            ))}                
        </ul>
    )
}