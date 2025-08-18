import { devtools } from 'zustand/middleware';

// Configuração para desenvolvimento
export const withDevTools = <T extends object>(
  store: T,
  name: string
) => {
  if (process.env.NODE_ENV === 'development') {
    return devtools(store, { name });
  }
  return store;
};
