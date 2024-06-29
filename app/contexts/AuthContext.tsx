// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context
interface AuthContextType {
  loggedInUser: any; // Replace 'any' with the actual user type if available
  setLoggedInUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual user type if available
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null); // Replace 'any' with the actual user type if available

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
