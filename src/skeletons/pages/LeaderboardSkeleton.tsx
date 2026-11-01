import { LeaderboardTableSkeleton } from "../components/LeaderboardTableSkeleton"
import { NavigationSkeleton } from "../components/NavigationSkeleton"

export const LeaderboardSkeleton = () => {
    return (
        <>
            <NavigationSkeleton/>

            <LeaderboardTableSkeleton length={50}/>
        </>
    )
}