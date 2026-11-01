import { BadgeSkeleton } from "../pages/BadgeSkeleton";
import { HomeSkeleton } from "../pages/HomeSkeleton";
import { LeaderboardSkeleton } from "../pages/LeaderboardSkeleton";
import { ProfileSkeleton } from "../pages/ProfileSkeleton";
import { QuizSkeleton } from "../pages/QuizSkeleton";

export const skeletonRegistry: Record<string, React.ReactNode> = {
    '/': <HomeSkeleton />,
    '/leaderboard': <LeaderboardSkeleton/>,
    '/quizzes': <QuizSkeleton />,
    '/badges': <BadgeSkeleton />,
    '/profile': <ProfileSkeleton />
}