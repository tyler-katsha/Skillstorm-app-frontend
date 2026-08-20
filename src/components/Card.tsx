import styles from '../module/Card.module.css'
import type { CardProps } from '../utils/type'

export const Card: React.FC<CardProps> = ({width = '100%',height = 'auto',title,text,numOfQuestions=0}) => {
    return(
        <div className={styles.cardContainer} style={{width:`${width}`,height:`${height}`}}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.description}>
                {text}
            </div>

            {numOfQuestions > 0 && <div className={styles.questionNumberBubble} style={{marginTop:'15px'}}>{numOfQuestions} Questions</div>}
        </div>
    )
}