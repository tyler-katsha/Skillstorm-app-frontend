import { CardGrid } from "../../components/cards/CardGrid";
import { HomeBadgeCardSkeleton } from "./HomeBadgeCardSkeleton";
import { Skeleton } from "./Skeleton";

export const BadgeSectionSkeleton = () => {

    const skeletonBadge = Array.from({ length: 4 });
    return (
        <>
            <Skeleton width="35%" height="20px"/>
            

            <CardGrid>
                {skeletonBadge.map((_, index) => (
                    <HomeBadgeCardSkeleton key={index} />
                ))}
            </CardGrid>
        </>
    )
}