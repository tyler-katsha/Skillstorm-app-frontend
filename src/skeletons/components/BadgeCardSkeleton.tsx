import styles from '../../module/BadgePage.module.css'
import { Skeleton } from './Skeleton'

export const BadgeCardSkeleton = () => {

    return (
        <article className={`${styles.badgeCard} ${false ? '' : styles.badgeLocked}`} style={{ cursor: 'pointer' }}>
            <div className={styles.badgeEmblem} aria-hidden="true"><Skeleton width='30%' height='55px'/></div>
            <span className={`${styles.badgeState} ${false ? styles.badgeEarned : ''}`}>
                {"\u00A0".repeat(20)}
            </span>
            <Skeleton width='25%'/>
            <div style={{marginBottom: '5px'}}/>
            <Skeleton width='75%'/>
            <div style={{marginBottom: '5px'}}/>
            <Skeleton width='85%' height='18px'/>
            <div style={{marginBottom: '15px'}}/>
            <div className={styles.badgeProgress}>
                    <div>
                        <Skeleton width='25%' height='15px'/>
                        <Skeleton width='15%'/>
                    </div>
                    <Skeleton width='100%' height='10px'/>
                </div>
        </article>
    )
}