import { BadgeSectionSkeleton } from "../components/BadgeSectionSkeleton"
import { LeaderboardCardSkeleton } from "../components/LeaderboardCardSkeleton"
import { LeaderboardTableSkeleton } from "../components/LeaderboardTableSkeleton"
import { NavigationSkeleton } from "../components/NavigationSkeleton"
import { QuizSectionSkeleton } from "../components/QuizSectionSkeleton"

export const HomeSkeleton = () => {
    return (
        <>
            <NavigationSkeleton />

            <LeaderboardCardSkeleton />

            <LeaderboardTableSkeleton/>

            <BadgeSectionSkeleton/>

            <QuizSectionSkeleton/>
        </>
    )
}