import type { BadgeCardProps } from "../utils/type"
import { Profile } from "./ProfileImageHolder"
import styles from '../module/BadgeCard.module.css'
export const BadgeCard: React.FC<BadgeCardProps> = ({name,description}) => {

    return(
        <div className={styles.cardContainer}>
            
            <Profile name={name} profileImageUrl={undefined} />

            <p className={styles.badgeName}>{name}</p>
            <p className={styles.badgeDescription}>{description}</p>
        </div>
    )
}