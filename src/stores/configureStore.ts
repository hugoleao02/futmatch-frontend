import { devtools } from 'zustand/middleware';
import { shouldUseDevTools } from '../utils/environment';

// Configuração para desenvolvimento
export const withDevTools = (store: Parameters<typeof devtools>[0], name: string) => {
  if (shouldUseDevTools()) {
    return devtools(store, { name });
  }
  return store;
};
