import { NavLink } from "react-router-dom";
import styles from '../../module/Navigation.module.css';
import type { NavigationLinkProps } from "../../types/nav";

export const NavigationLink:React.FC<NavigationLinkProps> = ({route,name}) => {
    return <li><NavLink to={route} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>{name}</NavLink></li>;
}