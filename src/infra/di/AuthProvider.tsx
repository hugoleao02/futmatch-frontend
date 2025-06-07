import React, { createContext, useContext } from 'react';
import type { Container } from './types';
import { container } from './container';

const AuthContext = createContext<Container | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={container}>{children}</AuthContext.Provider>
);
