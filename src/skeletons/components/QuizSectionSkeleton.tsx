import { CardGrid } from "../../components/cards/CardGrid";
import { HomeQuizCardSkeleton } from "./HomeQuizCardSkeleton";
import { Skeleton } from "./Skeleton";

export const QuizSectionSkeleton = () => {

    const skeletonQuiz = Array.from({length: 4});
    return (
        <>
            <Skeleton width="35%" height="20px"/>

            <CardGrid>
                {skeletonQuiz.map((_,index) => (
                    <HomeQuizCardSkeleton key={index}/>
                ))}
            </CardGrid>
        </>
    )
}