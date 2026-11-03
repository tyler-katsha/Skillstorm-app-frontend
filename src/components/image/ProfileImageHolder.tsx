import styles from '../../module/ProfileImage.module.css';
import { ColorUtil, getInitials } from "../../utils/Utils";
import type { ProfileCompProps } from "../../types/user";

export const Profile: React.FC<ProfileCompProps> = ({ name }) => {

    return <div className={styles.container} style={{ backgroundColor: ColorUtil(), cursor: 'auto' }}><span className={styles.initials}>{getInitials(name)}</span></div>
}