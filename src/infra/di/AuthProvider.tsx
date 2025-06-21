import React, { createContext, useContext } from 'react';
import { Container } from './container';
import type { Container as ContainerType } from './types';

const AuthContext = createContext<ContainerType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={Container.getInstance()}>{children}</AuthContext.Provider>
);
