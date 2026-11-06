import { API } from "../API";
import { getToken } from "../Utils";

export const onLeaderboardRefresh = async () => {

    const token = getToken();

    if(!token) {
        throw new Error('No Token Found');
    }

    const response = await fetch(`${API}/leaderboard/refresh`, {
        method: 'GET',
        headers: {
           "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
        }
    });

    if(!response.ok) {
        throw new Error(`Unable to refresh Leading Users: ${response.status}`);
    }
}
export const findAllLeadingUsers = async (setIsLoading: any, setLeadingUsers: any) => {
    setIsLoading(true);

    try {
        const token = getToken();

        if (!token) {
            throw new Error("No Token Found");
        }

        const response = await fetch(`${API}/leaderboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Unable to fetch Leading Users: ${response.status}`);
        }

        const data = await response.json();

        setLeadingUsers(data);

        return data;

    } catch (err) {
        console.error("Leaderboard Error:", err);
        throw err;

    } finally {
        setIsLoading(false);
    }
};
