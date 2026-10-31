import type { SmallBadgeResponse } from "./badge";
import type { SmallQuizResponse } from "./quiz";

export interface HomeSection {
    badgeSection: SmallBadgeResponse[];
    quizSection: SmallQuizResponse[];
}