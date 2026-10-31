import type { SmallBadgeResponse } from "./badge";
import type { SmallQuizResponse } from "./quiz";

export interface HomeBadgeCardProps {
    badge: SmallBadgeResponse;
}
export interface HomeQuizCardProps {
    quiz: SmallQuizResponse;
}
export interface CardGridProps {
    children: React.ReactNode;
}
