import { useCallback } from 'react';
import { useServiceOperations } from './useServiceOperations';

export interface CrudOperationsConfig<T> {
  onItemCreated?: (item: T) => void;
  onItemUpdated?: (item: T) => void;
  onItemDeleted?: (id: number) => void;
}

export const useCrudOperations = <T extends { id: number }, CreateData, UpdateData>(
  config: CrudOperationsConfig<T> = {},
) => {
  const {
    data: items,
    loading,
    executeOperation,
    executeOperationGeneric,
    addItem,
    updateItem,
    removeItem,
    setDataList,
    getItemById,
  } = useServiceOperations<T>({
    onSuccess: (data, operation) => {
      if (operation === 'Criar item') {
        config.onItemCreated?.(data);
      } else if (operation === 'Atualizar item') {
        config.onItemUpdated?.(data);
      } else if (operation === 'Deletar item') {
        config.onItemDeleted?.(data.id);
      }
    },
  });

  const { onItemCreated, onItemUpdated, onItemDeleted } = config;

  const create = useCallback(
    async (data: CreateData, service: (data: CreateData) => Promise<T>): Promise<T> => {
      const result = await executeOperation(() => service(data), 'Criar item', {
        updateData: true,
        transform: (response: T) => response,
      });

      addItem(result);
      onItemCreated?.(result);

      return result;
    },
    [executeOperation, addItem, onItemCreated],
  );

  const update = useCallback(
    async (
      id: number,
      data: UpdateData,
      service: (id: number, data: UpdateData) => Promise<T>,
    ): Promise<T> => {
      const result = await executeOperation(() => service(id, data), 'Atualizar item', {
        updateData: true,
        transform: (response: T) => response,
      });

      updateItem(id, () => result);
      onItemUpdated?.(result);

      return result;
    },
    [executeOperation, updateItem, onItemUpdated],
  );

  const remove = useCallback(
    async (id: number, service: (id: number) => Promise<void>): Promise<void> => {
      await executeOperationGeneric<void>(() => service(id), 'Deletar item');
      removeItem(id);
      onItemDeleted?.(id);
    },
    [executeOperationGeneric, removeItem, onItemDeleted],
  );

  return {
    items,
    loading,
    create,
    update,
    remove,
    setItemsList: setDataList,
    getItemById,
  };
};
