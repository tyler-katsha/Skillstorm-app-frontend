import type { CardGridProps } from '../../types/card'
import styles from '../../module/CardGrid.module.css'

export const CardGrid: React.FC<CardGridProps> = ({ children }) => {
    return <div className={styles.gridContainer}>{children}</div>  
}