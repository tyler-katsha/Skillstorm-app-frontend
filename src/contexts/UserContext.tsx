import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserContextType, UserProps } from '../types/user'; // Adjust import to your user type


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserStats, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};