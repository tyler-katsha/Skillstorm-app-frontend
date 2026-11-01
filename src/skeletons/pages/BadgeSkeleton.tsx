import styles from '../../module/BadgePage.module.css'
import { BadgeCardSkeleton } from '../components/BadgeCardSkeleton'
import { NextBadgeSkeleton } from '../components/NextBadgeSkeleton'
import { Skeleton } from '../components/Skeleton'

export const BadgeSkeleton = () => {

    const skeletonBadges = Array.from({length: 21});
    return (
        <div className={styles.badgePage}>
                    <Skeleton width='15%'/>
        
                    <section className={styles.intro}>
                        <div>
                            <Skeleton width='45%' height='18px'/>
                            <h1>{'\u00A0'.repeat(35)}</h1>
                            <Skeleton width='60%' height='40px'/>
                            <div style={{marginBottom: '5px'}}/>
                            <Skeleton width='100%'/>
                        </div>
                        <div className={styles.introRight}>
                            {'\u00A0'.repeat(19)}
                            <Skeleton height='38px'/>
                            <div style={{marginBottom: '5px'}}/>
                            <Skeleton height='38px'/>
                            <div className={styles.introIcon} aria-hidden="true">{'\u00A0'.repeat(5)}<Skeleton height='38px' width='100%'/></div>
                        </div>
                    </section>
        
                    <section className={styles.badgeHero}>
                        
                        <span aria-hidden="true">{"\u00A0".repeat(5)}<Skeleton width='100%' height='100px'/></span>
                        <div>
                            <Skeleton width='14%'/>
                            <div style={{marginBottom: '5px'}}/>
                            <Skeleton width='31%'/>
                            <div style={{marginBottom: '10px'}}/>
                            <Skeleton width='25%'/>
                            <div style={{marginBottom: '15px'}}/>
                            
                            <Skeleton height='10px' width='100%'/>
                        </div>
                        <strong>{"\u00A0".repeat(20)}<Skeleton height='35px'/></strong>
                        
                    </section>
                    
        
                    <NextBadgeSkeleton/>
        
                    <div className={styles.badgeListHeading}>
                        <div>
                            <span className={styles.eyebrow}>{"\u00A0".repeat(30)}</span>
                            <Skeleton height='10px' width='70%'/>
                            <div style={{marginBottom: '15px'}}/>
                            <Skeleton height='25px' width='100%'/>
                        </div>
                        <Skeleton width='200px' height='30px'/>
                    </div>
        
                    <section className={styles.badgeGrid} aria-label="Badges">
                        {skeletonBadges.map((_,index) => (
                            <BadgeCardSkeleton key={index}/>
                        ))}
                    </section>
        
        
                </div>
    )
}