
import { Skeleton } from '../components/Skeleton';
export const DefaultSkeleton = () => {
    return (
        <>
            
            <div style={{ padding: "20px" }}>
                <Skeleton height='30px' width='60%' />
                <br />
                <Skeleton height='20px' width='60%' />
                <br />
                <Skeleton height='20px' width='60%' />
            </div>
            
        </>

    );
};