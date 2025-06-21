import { createContext } from 'react';
import { Container } from './container';
import type { Container as ContainerType } from './types';

export const ContainerContext = createContext<ContainerType | null>(null);

export function ContainerProvider({ children }: { children: React.ReactNode }) {
  return (
    <ContainerContext.Provider value={Container.getInstance()}>
      {children}
    </ContainerContext.Provider>
  );
}
