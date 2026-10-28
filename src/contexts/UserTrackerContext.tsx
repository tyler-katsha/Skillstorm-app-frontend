import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile } from '../types/user';
import type { ProfileHistoryState, UserTrackerResponse, ProfileTrackerAPIResponse } from '../types/tracker';
import { fetchUserTrackerHistory } from '../utils/services/trackerService';

const ProfileHistoryContext = createContext<ProfileHistoryState | undefined>(undefined);

export const ProfileHistoryProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [tracker, setTracker] = useState<UserTrackerResponse | null>(null);
    const [rank, setRank] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfileData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const data: ProfileTrackerAPIResponse = await fetchUserTrackerHistory();
            
            setProfile(data.user);
            setTracker(data.userTrackerResponse); 
            setRank(data.rank);

        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
            console.error("Profile fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    return (
        <ProfileHistoryContext.Provider 
            value={{ 
                profile, 
                tracker, 
                rank, 
                isLoading, 
                error, 
                refreshData: fetchProfileData 
            }}
        >
            {children}
        </ProfileHistoryContext.Provider>
    );
};

export const useProfileHistory = (): ProfileHistoryState => {
    const context = useContext(ProfileHistoryContext);
    if (context === undefined) {
        throw new Error('useProfileHistory must be used within a ProfileHistoryProvider');
    }
    return context;
};