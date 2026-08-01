import styles from '../module/Card.module.css'
import type { CardProps } from '../utils/type'

export const Card: React.FC<CardProps> = ({width = '100%',height = 'auto',title,text}) => {
    return(
        <div className={styles.cardContainer} style={{width:`${width}`,height:`${height}`}}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.description}>
                {text}
            </div>
        </div>
    )
}