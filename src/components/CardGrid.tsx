import styles from '../module/CardGrid.module.css'
import type { CardGridProps } from "../types/type"
import { Card } from "./Card"
export const CardGrid: React.FC<CardGridProps> = ({ width = '100%', height = 'auto', cardData = [] }) => {
    return (
        <div className={styles.gridContainer}>
            {cardData.map((item, index) => (
                <div key={index}>
                    <Card width={width} height={height} title={item.title} text={item.text} numOfQuestions={item.numOfQuestions} />
                </div>
            ))}
        </div>
    )
}