import { Navigate } from "react-router-dom"
import { DefaultSkeleton } from "../../skeletons/pages/DefaultSkeleton"

export const RedirectUser = () => {
    return(
        <>
        <DefaultSkeleton />
        <Navigate to='/login' replace/>
        </>
    )
}