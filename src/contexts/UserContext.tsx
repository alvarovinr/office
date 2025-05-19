import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Position, Department } from '../types';

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  createAccount: (name: string, email: string, password: string) => Promise<void>;
  updateUserAvatar: (avatarId: number) => void;
  updateUserPosition: (position: Position) => void;
  updateUserDepartment: (department: Department) => void;
}

const defaultUserContext: UserContextType = {
  currentUser: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  createAccount: async () => {},
  updateUserAvatar: () => {},
  updateUserPosition: () => {},
  updateUserDepartment: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('virtualOfficeUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login functionality (would connect to backend in production)
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    try {
      // Mock successful login
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        avatarId: 1,
        department: Department.None,
        position: { x: 400, y: 300, areaId: 'lobby' },
        isOnline: true,
      };
      
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('virtualOfficeUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('virtualOfficeUser');
  };

  const createAccount = async (name: string, email: string, password: string) => {
    // Mock account creation
    try {
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        avatarId: 1,
        department: Department.None,
        position: { x: 400, y: 300, areaId: 'lobby' },
        isOnline: true,
      };
      
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('virtualOfficeUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Account creation failed', error);
      throw new Error('Could not create account. Please try again.');
    }
  };

  const updateUserAvatar = (avatarId: number) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, avatarId };
      setCurrentUser(updatedUser);
      localStorage.setItem('virtualOfficeUser', JSON.stringify(updatedUser));
    }
  };

  const updateUserPosition = (position: Position) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, position };
      setCurrentUser(updatedUser);
      localStorage.setItem('virtualOfficeUser', JSON.stringify(updatedUser));
    }
  };

  const updateUserDepartment = (department: Department) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, department };
      setCurrentUser(updatedUser);
      localStorage.setItem('virtualOfficeUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      logout,
      createAccount,
      updateUserAvatar,
      updateUserPosition,
      updateUserDepartment,
    }}>
      {children}
    </UserContext.Provider>
  );
};