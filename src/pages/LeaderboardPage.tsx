import { useEffect, useState } from "react";
import { Leaderboard } from "../components/leaderboard/Leaderboard";
import type { LeaderBoardUser } from "../types/leaderboard";
import { findAllLeadingUsers } from "../utils/services/LeaderboardApi";


export const LeaderboardPage = ({ limit = 100000, isBackground = true, title = 'Global Leaderboard - Global Stormers' }) => {
    const [leadingUsers, setLeadingUsers] = useState<LeaderBoardUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        findAllLeadingUsers(setIsLoading, setLeadingUsers);
    }, []);

    return <Leaderboard users={leadingUsers} title={title} isLoading={isLoading} limit={limit} isBackground={isBackground} />
}