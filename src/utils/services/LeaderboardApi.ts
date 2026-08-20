import { API } from "../API";
import { getToken } from "../Utils";

const token = getToken();

export const findAllLeadingUsers = async (setIsLoading:any,setLeadingUsers:any) => {
            setIsLoading(true);
        try{
            
            const response = await fetch(`${API}/leaderboard`,{
                method:"GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(!response.ok){
                throw new Error(`Unable to fetch Leading Users: ${response.status}`);
            }

            const data = await response.json();

            setLeadingUsers(data);

        } catch(err){
            console.error(err);
        } finally{
            setIsLoading(false);
        }
    }