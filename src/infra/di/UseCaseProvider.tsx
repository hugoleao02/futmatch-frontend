import React, { createContext, useContext, useMemo } from 'react';
import type { ILoginUseCase } from '../../domain/usecases/interfaces/ILoginUseCase';
import type { IRegisterUseCase } from '../../domain/usecases/interfaces/IRegisterUseCase';
import { Container } from './container';

interface UseCaseContextData {
  loginUseCase: ILoginUseCase;
  registerUseCase: IRegisterUseCase;
}

const UseCaseContext = createContext<UseCaseContextData | null>(null);

export const useUseCase = () => {
  const context = useContext(UseCaseContext);

  if (!context) {
    throw new Error('useUseCase deve ser usado dentro de um UseCaseProvider');
  }

  return context;
};

export const UseCaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const useCases = useMemo(() => {
    const container = Container.getInstance();
    return {
      loginUseCase: container.useCases.loginUseCase,
      registerUseCase: container.useCases.registerUseCase,
    };
  }, []);

  return <UseCaseContext.Provider value={useCases}>{children}</UseCaseContext.Provider>;
};
