import { useNavigate } from "react-router-dom"
import { CardGrid } from "../components/CardGrid"
import styles from '../module/Home.module.css'
import { cardData, badgeData, quizData } from "../utils/MockData"
import { LeaderboardPage } from "./LeaderboardPage"
export const Home = () => {

    const navigate = useNavigate();
    const handleQuiz = () => {
        navigate('/quizzes',{replace:true})
    }
     return(
        <>
            
            <div className={styles.bigCardContainer}>
                <p className={styles.bigCardParagraph}>Season 1 - Climb the Ranks</p>
                <h1>Master Subject, Climb Leaderboards</h1>
                <p className={styles.bigCardParagraph}>
                    Compete with peers, and track your progress.
                    Every quiz brings you closer to the top.
                </p>
                <button onClick={handleQuiz} className={styles.quizBtn}>Start a Quiz</button>
            </div>
            
            <CardGrid width={'250px'} cardData={cardData}/>

            <LeaderboardPage limit={5} isBackground={false} title={'Global Leaderboard - Top 5 Stormers'}/>

            <h1 style={{margin: '1rem'}}>Enable Badges</h1>

            <CardGrid width={'250px'} height={'150px'} cardData={badgeData}/>

            <h1 style={{margin: '1rem'}}>Featured Quizzes</h1>
            
            <CardGrid width={'250px'} cardData={quizData}/>

        </>
    )
}