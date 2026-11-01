import { CardGrid } from "../../components/cards/CardGrid";
import { HomeQuizCardSkeleton } from "./HomeQuizCardSkeleton";

export const QuizSectionSkeleton = () => {

    const skeletonQuiz = Array.from({length: 4});
    return (
        <>
            <h2 style={{ margin: '3rem' }}>Featured Quizzes</h2>

            <CardGrid>
                {skeletonQuiz.map((_,index) => (
                    <HomeQuizCardSkeleton key={index}/>
                ))}
            </CardGrid>
        </>
    )
}