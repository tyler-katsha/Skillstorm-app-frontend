import styles from '../../module/BadgeCard.module.css'
import type { BadgeCardProps } from '../../types/badge'
import { Profile } from "../image/ProfileImageHolder"
export const BadgeCard: React.FC<BadgeCardProps> = ({ name, description }) => {

    return (
        <div className={styles.cardContainer}>

            <Profile name={name} />

            <p className={styles.badgeName}>{name}</p>
            <p className={styles.badgeDescription}>{description}</p>
        </div>
    )
}