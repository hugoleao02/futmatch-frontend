import React, { createContext, useContext } from 'react';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../core/use-cases/LoginUseCase';

const authRepo = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepo);

const AuthContext = createContext({ loginUseCase });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={{ loginUseCase }}>
    {children}
  </AuthContext.Provider>
); 