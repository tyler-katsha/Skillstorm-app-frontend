import styles from '../../module/BadgePage.module.css'
import { Skeleton } from './Skeleton'

export const NextBadgeSkeleton = () => {

    return (
        <section className={styles.nextBadge}>
            <span className={styles.nextIcon}><Skeleton width='100px' height='100px'/></span>
            <div>
                <Skeleton width='8%' height='10px'/>
                <div style={{marginBottom: '5px'}}/>
                <Skeleton width='10%' height='12px'/>
                <div style={{marginBottom: '10px'}}/>
                <Skeleton width='13%' height='15px'/>
            </div>
            <strong>{"\u00A0".repeat(10)}<Skeleton width='100%' height='30px'/></strong>
        </section>
    )
}