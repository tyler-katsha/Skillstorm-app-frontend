import { Outlet } from "react-router-dom"
import { Navigation } from "../navigation/Navigation"

export const MainLayout = () => {

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}