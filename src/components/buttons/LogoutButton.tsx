import { useNavigate } from "react-router-dom";
import { destroyToken } from "../../utils/Utils";
import styles from '../../module/Navigation.module.css';

export const LogoutButton = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            destroyToken();
            navigate('/login', { replace: true })
        } catch (error) {}
    }
    
    return <button type="button" className={styles.logoutButton} onClick={handleLogout}>Logout</button>
}