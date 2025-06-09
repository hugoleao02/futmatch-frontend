import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface ContainerContextType {
  // Adicione aqui as dependências que serão injetadas
}

const ContainerContext = createContext<ContainerContextType | null>(null);

export const ContainerProvider = ({ children }: { children: ReactNode }) => {
  const container: ContainerContextType = {
    // Inicialize aqui as dependências
  };

  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

export const useContainer = () => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error('useContainer must be used within a ContainerProvider');
  }
  return context;
};
