import { Divider } from "../../components/common/Divider";
import styles from '../../module/Navigation.module.css';
import { Skeleton } from "./Skeleton";

export const NavigationSkeleton = () => {

    const skeletonLinks = Array.from({ length: 5 });
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navbarContainer}>

                    <Skeleton height="65%" width="105px" />

                    <ul className={styles.navLinks}>
                        {skeletonLinks.map((_, index) => (
                            <li key={index}>
                                <Skeleton height="24px" width="80px" />
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginRight: '100px' }} />
                    <Skeleton height="40px" width="100px" />

                </div>
            </nav>
            <Divider />
        </>
    )
}