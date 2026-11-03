import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { delay, destroyToken } from "../utils/Utils";
import { HomeSkeleton } from "../skeletons/pages/HomeSkeleton";

export const OAuth2Redirect = () => {
    const { fetchUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const hasProcessed = useRef(false);

    const run = async () => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
            navigate("/login?error=token_missing", { replace: true });
            return;
        }

        try {
            localStorage.setItem("jwt-token", token);
            
            window.history.replaceState({}, document.title, window.location.pathname);

            await Promise.all([fetchUser(),delay(1500)]);
            
            navigate("/", { replace: true });
        } catch (err) {
            destroyToken();
            navigate("/login?error=authentication_failed", { replace: true });
        }
    };

    useEffect(() => {
        if(hasProcessed.current) return;
        hasProcessed.current = true;

        run();
    },[location.search,navigate,fetchUser]);

    return <HomeSkeleton />
};