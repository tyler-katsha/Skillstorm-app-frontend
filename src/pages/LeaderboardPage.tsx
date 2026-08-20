import { useEffect, useState } from "react";
import { Leaderboard } from "../components/Leaderboard";
import { type LeaderBoardUser } from "../utils/type";
import { findAllLeadingUsers } from "../utils/services/LeaderboardApi";


export const LeaderboardPage = ({limit=10,isBackground=true,title='Global Leaderboard - Top 10 Stormers'}) => {
    const [leadingUsers,setLeadingUsers] = useState<LeaderBoardUser[]>([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        findAllLeadingUsers(setIsLoading,setLeadingUsers);
    },[]);

    return  <Leaderboard users={leadingUsers} title={title} isLoading={isLoading} limit={limit} isBackground={isBackground}/>
}