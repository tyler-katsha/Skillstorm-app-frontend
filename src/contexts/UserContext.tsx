import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserContextType, UserProps } from '../types/user'; // Adjust import to your user type
import { getToken, removeAll } from '../utils/Utils';
import { API } from '../utils/API';
import { HomeSkeleton } from '../skeletons/pages/HomeSkeleton';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthentication] = useState<boolean>(() => user !== null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthentication(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthentication(false);
    }
  }, [user]);

  const fetchUser = async () => {
    if (localStorage.getItem('login-register-pages') === 'true' || localStorage.getItem('email') === 'true') {
      setIsLoading(false);
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No Token Found');
      }

      const response = await fetch(`${API}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const data: UserProps = await response.json();
      setUser(data);
      setIsAuthentication(true);
    } catch (err) {
      setUser(null);
      setIsAuthentication(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Update entire user profile
  const updateUser = (newData: UserProps) => {
    setUser(newData);
  };

  // Helper to cleanly update XP and Level
  const updateUserStats = (newXp: number, newLevel?: number) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        xp: newXp,
        ...(newLevel !== undefined && { level: newLevel }),
      };
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthentication(false);
    removeAll();
  };

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return <UserContext.Provider value={{user, setUser, isLoading, isAuthenticated, setIsAuthentication, fetchUser, updateUser, updateUserStats, logout, }}>{children}</UserContext.Provider>
 
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};