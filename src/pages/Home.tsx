import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from '../module/Home.module.css'
import { CardGrid } from "../components/cards/CardGrid"
import { LeaderboardPage } from "./LeaderboardPage"
import { findHomePageData } from "../utils/services/HomeApi"
import { HomeBadgeCard } from "../components/cards/HomeBadgeCard"
import { HomeQuizCard } from "../components/cards/HomeQuizCard"
import type { HomeSection } from "../types/home"
import { HomeSkeleton } from "../skeletons/pages/HomeSkeleton"
import { RedirectUser } from "../components/auth/RedirectUser"
import { ErrorPage } from "./ErrorPage"
import { ERROR_MESSAGES, type ErrorType } from "../types/error"

export const Home = () => {
    const navigate = useNavigate();
    
    const [homeData, setHomeData] = useState<HomeSection | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorType, setErrorType] = useState<ErrorType | null>(null);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                setIsLoading(true);
                const data = await findHomePageData();
                setHomeData(data);
            } catch (err: any) {
                setErrorType('LOAD_DATA_FAILED');
            } finally {
                setIsLoading(false);
            }
        };

        loadHomeData();
    }, []); 

    if (isLoading) {
        return <HomeSkeleton />
    }

    if (errorType) {
        return <ErrorPage {...ERROR_MESSAGES[errorType]}/>
    }

    if (!homeData) return <RedirectUser />;

    const handleQuiz = () => {
        navigate('/quizzes', { replace: true })
    }

    const renderBadges = () => (
        <CardGrid>
            {homeData.badgeSection.map((badge) => (
                <HomeBadgeCard key={badge.definitionId} badge={badge} />
            ))}
        </CardGrid>
    );

    const renderQuizzes = () => (
        <CardGrid>
            {homeData.quizSection.map((quiz, idx) => (
                <HomeQuizCard key={quiz.topicName + idx} quiz={quiz} />
            ))}
        </CardGrid>
    );

    return (
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

            <LeaderboardPage limit={5} isBackground={false} title={'Global Leaderboard - Top 5 Stormers'} />

            <h2 style={{ margin: '3rem' }}>Enable Badges</h2>
            {renderBadges()}

            <h2 style={{ margin: '3rem' }}>Featured Quizzes</h2>
            {renderQuizzes()}
        </>
    )
}