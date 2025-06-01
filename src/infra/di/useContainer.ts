import { useContext } from 'react';
import { ContainerContext } from './ContainerContext';

export function useContainer() {
  const container = useContext(ContainerContext);
  if (!container) {
    throw new Error('useContainer must be used within a ContainerProvider');
  }
  return container;
} 