import { useCallback, useState } from 'react';

// Constraint para itens que devem ter um ID
export interface Identifiable {
  id: number;
}

export const useCrudOperations = <T extends Identifiable>() => {
  const [data, setData] = useState<T[]>([]);

  const addItem = useCallback((item: T) => {
    setData(prev => [...prev, item]);
  }, []);

  const updateItem = useCallback((id: number, updater: (item: T) => T) => {
    setData(prev => prev.map(item => (item.id === id ? updater(item) : item)));
  }, []);

  const removeItem = useCallback((id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
  }, []);

  const setDataList = useCallback((newData: T[]) => {
    setData(newData);
  }, []);

  const getItemById = useCallback(
    (id: number): T | undefined => {
      return data.find(item => item.id === id);
    },
    [data],
  );

  return {
    data,
    addItem,
    updateItem,
    removeItem,
    setDataList,
    getItemById,
  };
};
