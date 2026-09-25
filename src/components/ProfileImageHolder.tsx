import { useNavigate } from "react-router-dom";
import styles from '../module/ProfileImage.module.css';
import type { ProfileCompProps } from '../types/type';
import { ColorUtil, getInitials } from "../utils/Utils";

export const Profile: React.FC<ProfileCompProps> = ({ name, profileImageUrl, link = true }) => {

    const navigate = useNavigate();

    return (

        <>
            {link ? (
                <a onClick={() => navigate("/profile")}>
                    <div className={styles.container} style={{ backgroundColor: ColorUtil() }}>
                        {profileImageUrl ? (
                            <img src={profileImageUrl} alt={`${name} Image`} className={styles.image} />
                        ) : (
                            <span className={styles.initials}>{getInitials(name)}</span>
                        )}
                    </div>
                </a>
            ) : (
                <div className={styles.container} style={{ backgroundColor: ColorUtil(), cursor: 'auto' }}>
                    {profileImageUrl ? (<img src={profileImageUrl} alt={`${name} Image`} className={styles.image} />
                    ) : (<span className={styles.initials}>{getInitials(name)}</span>)}
                </div>
            )}
        </>


    )
}