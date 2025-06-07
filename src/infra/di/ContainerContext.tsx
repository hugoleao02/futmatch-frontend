import { createContext } from 'react';
import { container } from './container';
import type { Container } from './types';

export const ContainerContext = createContext<Container | null>(null);

export function ContainerProvider({ children }: { children: React.ReactNode }) {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
}
