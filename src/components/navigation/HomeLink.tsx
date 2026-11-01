import { Link } from 'react-router-dom';
import styles from '../../module/Navigation.module.css';
import { APP_NAME } from '../../types/nav';

export const HomeLink = () => {
    return <Link to="/" className={styles.logo}>{APP_NAME}</Link>
}