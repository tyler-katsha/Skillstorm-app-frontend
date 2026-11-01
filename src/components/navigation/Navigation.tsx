import { LogoutButton } from '../buttons/LogoutButton';
import styles from '../../module/Navigation.module.css';
import { HomeLink } from './HomeLink';
import { NavigationRegistry } from './NavigationRegistry';
import { Divider } from '../common/Divider';

export const Navigation = () => {
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navbarContainer}>

                    <HomeLink />

                    <NavigationRegistry/>

                    <LogoutButton />

                </div>
            </nav>
            <Divider/>
        </>
    )
}