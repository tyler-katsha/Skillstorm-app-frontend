import { CardGrid } from "../components/CardGrid"
import { Navigation } from "../components/Navigation"
import styles from '../module/Home.module.css'
import { cardData } from "../utils/MockData"
export const Home = () => {
    return(
        <>
            <Navigation />  
            <hr className={styles.divider}/>

            <CardGrid width={'250px'} cardData={cardData}/>
        </>
    )
}