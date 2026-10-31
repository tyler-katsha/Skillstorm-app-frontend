import styles from '../../module/HomeBadgeCard.module.css';
import type { HomeBadgeCardProps } from '../../types/card';

export const HomeBadgeCard: React.FC<HomeBadgeCardProps> = ({badge}) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.iconWrapper}>
                {badge.icon}
            </div>
            <h3 className={styles.title}>{badge.title}</h3>
        </div>
    );
}