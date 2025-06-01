import React, { createContext, useContext } from 'react';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../core/usecases/LoginUseCase';
import { RegisterUseCase } from '../../core/usecases/RegisterUseCase';
import type { ILoginUseCase } from '../../core/usecases/interfaces/ILoginUseCase';
import type { IRegisterUseCase } from '../../core/usecases/interfaces/IRegisterUseCase';

const authRepo = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepo);
const registerUseCase = new RegisterUseCase(authRepo);

interface UseCaseContextData {
  loginUseCase: ILoginUseCase;
  registerUseCase: IRegisterUseCase;
}

const UseCaseContext = createContext<UseCaseContextData>({} as UseCaseContextData);

export const useUseCase = () => useContext(UseCaseContext);

export const UseCaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <UseCaseContext.Provider value={{ loginUseCase, registerUseCase }}>
    {children}
  </UseCaseContext.Provider>
); 