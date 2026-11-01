import { CardGrid } from "../../components/cards/CardGrid";
import { HomeBadgeCardSkeleton } from "./HomeBadgeCardSkeleton";

export const BadgeSectionSkeleton = () => {

    const skeletonBadge = Array.from({ length: 4 });
    return (
        <>
            <h2 style={{ margin: '3rem' }}>Enable Badges</h2>

            <CardGrid>
                {skeletonBadge.map((_, index) => (
                    <HomeBadgeCardSkeleton key={index} />
                ))}
            </CardGrid>
        </>
    )
}