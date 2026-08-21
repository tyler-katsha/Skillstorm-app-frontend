import { createContext, useEffect, useState, useContext, type Dispatch, type SetStateAction } from "react";
import { API } from "../utils/API";
import { type UserProps } from "../utils/type";
import { HomeSkeleton } from "../skeletons/pages/HomeSkeleton";
import { getToken, removeAll } from "../utils/Utils";
interface UserContextType {
    user: UserProps | null;
    isLoading: boolean;
    updateUser: (newData: UserProps) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
    isAuthenticated: boolean;
    setIsAuthentication: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated,setIsAuthentication] = useState(user !== null);
    
    const fetchUser = async () => {

        if(localStorage.getItem('login-register-pages') === 'true'){
            setIsLoading(false);
            return;
        }
        if(localStorage.getItem('email') === 'true'){
            setIsLoading(false);
            return;
        }
        

        try {
            const token = getToken();
            
            if(!token){
                throw new Error(`No Token Found`);
            }
            const response = await fetch(`${API}/users/me`, {
                method: 'GET',
                headers: { 
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`)
            }

            
            const data = await response.json();
            setUser(data);
            setIsAuthentication(true);
        } catch (err) {
            setUser(null);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const updateUser = (newData: UserProps) => {
        setUser(newData);
    }

    const logout = () => {
        setUser(null);
        removeAll();
    }

    if (isLoading) return <HomeSkeleton />;

    return (
        <UserContext.Provider value={{ user, isLoading, updateUser, logout, fetchUser, isAuthenticated,setIsAuthentication }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within UserProvider')
    }
    return context;
}