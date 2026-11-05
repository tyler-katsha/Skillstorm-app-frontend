import { BadgeSectionSkeleton } from "../components/BadgeSectionSkeleton"
import { LeaderboardCardSkeleton } from "../components/LeaderboardCardSkeleton"
import { LeaderboardTableSkeleton } from "../components/LeaderboardTableSkeleton"
import { QuizSectionSkeleton } from "../components/QuizSectionSkeleton"

export const HomeSkeleton = () => {
    return (
        <>
            <LeaderboardCardSkeleton />

            <LeaderboardTableSkeleton/>

            <BadgeSectionSkeleton/>

            <QuizSectionSkeleton/>
        </>
    )
}