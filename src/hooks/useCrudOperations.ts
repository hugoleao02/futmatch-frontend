import { useCallback, useState } from 'react';
import { useAsyncOperation } from './useAsyncOperation';

export interface CrudOperationsConfig<T> {
  onItemCreated?: (item: T) => void;
  onItemUpdated?: (item: T) => void;
  onItemDeleted?: (id: number) => void;
  successMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
}

export const useCrudOperations = <T extends { id: number }, CreateData, UpdateData>(
  config: CrudOperationsConfig<T> = {},
) => {
  const [items, setItems] = useState<T[]>([]);
  const { executeOperationWithoutParams, loading } = useAsyncOperation<any>();

  const { onItemCreated, onItemUpdated, onItemDeleted, successMessages = {} } = config;

  const create = useCallback(
    async (data: CreateData, service: (data: CreateData) => Promise<T>): Promise<T> => {
      const result = await executeOperationWithoutParams(
        () => service(data),
        successMessages.create || 'Item criado com sucesso!',
        'Criar item',
      );

      setItems(prev => [...prev, result]);
      onItemCreated?.(result);

      return result;
    },
    [executeOperationWithoutParams, onItemCreated, successMessages.create],
  );

  const update = useCallback(
    async (
      id: number,
      data: UpdateData,
      service: (id: number, data: UpdateData) => Promise<T>,
    ): Promise<T> => {
      const result = await executeOperationWithoutParams(
        () => service(id, data),
        successMessages.update || 'Item atualizado com sucesso!',
        'Atualizar item',
      );

      setItems(prev => prev.map(item => (item.id === id ? result : item)));
      onItemUpdated?.(result);

      return result;
    },
    [executeOperationWithoutParams, onItemUpdated, successMessages.update],
  );

  const remove = useCallback(
    async (id: number, service: (id: number) => Promise<void>): Promise<void> => {
      (await executeOperationWithoutParams(
        () => service(id),
        successMessages.delete || 'Item deletado com sucesso!',
        'Deletar item',
      )) as any;

      setItems(prev => prev.filter(item => item.id !== id));
      onItemDeleted?.(id);
    },
    [executeOperationWithoutParams, onItemDeleted, successMessages.delete],
  );

  const setItemsList = useCallback((newItems: T[]) => {
    setItems(newItems);
  }, []);

  const getItemById = useCallback(
    (id: number): T | undefined => {
      return items.find(item => item.id === id);
    },
    [items],
  );

  return {
    items,
    loading,
    create,
    update,
    remove,
    setItemsList,
    getItemById,
  };
};
