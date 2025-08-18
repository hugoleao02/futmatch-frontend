import { useCallback, useState } from 'react';
import { useAsyncOperation } from './useAsyncOperation';

export interface ServiceOperationsConfig<T> {
  onSuccess?: (data: T, operation: string) => void;
  onError?: (error: unknown, operation: string) => void;
}

export const useServiceOperations = <T>(config: ServiceOperationsConfig<T> = {}) => {
  const [data, setData] = useState<T[]>([]);
  const { executeOperationWithoutParams, loading } = useAsyncOperation<T>();

  const { onSuccess, onError } = config;

  const executeOperation = useCallback(
    async (
      operation: () => Promise<T>,
      operationName: string,
      options?: {
        updateData?: boolean;
        transform?: (response: T) => T | T[];
      },
    ): Promise<T> => {
      try {
        const response = await executeOperationWithoutParams(operation, operationName);

        if (options?.updateData && options?.transform) {
          const transformedData = options.transform(response);
          if (Array.isArray(transformedData)) {
            setData(transformedData);
          } else {
            setData(prev => [...prev, transformedData]);
          }
        }

        onSuccess?.(response, operationName);
        return response;
      } catch (error) {
        onError?.(error, operationName);
        throw error;
      }
    },
    [executeOperationWithoutParams, onSuccess, onError],
  );

  const executeOperationGeneric = useCallback(
    async <R>(operation: () => Promise<R>, operationName: string): Promise<R> => {
      try {
        const response = await executeOperationWithoutParams(
          operation as unknown as () => Promise<T>,
          operationName,
        );
        onSuccess?.(response as T, operationName);
        return response as R;
      } catch (error) {
        onError?.(error, operationName);
        throw error;
      }
    },
    [executeOperationWithoutParams, onSuccess, onError],
  );

  const addItem = useCallback((item: T) => {
    setData(prev => [...prev, item]);
  }, []);

  const updateItem = useCallback((id: number, updater: (item: T) => T) => {
    setData(prev => prev.map(item => ((item as any).id === id ? updater(item) : item)));
  }, []);

  const removeItem = useCallback((id: number) => {
    setData(prev => prev.filter(item => (item as any).id !== id));
  }, []);

  const setDataList = useCallback((newData: T[]) => {
    setData(newData);
  }, []);

  const getItemById = useCallback(
    (id: number): T | undefined => {
      return data.find(item => (item as any).id === id);
    },
    [data],
  );

  return {
    data,
    loading,
    executeOperation,
    executeOperationGeneric,
    addItem,
    updateItem,
    removeItem,
    setDataList,
    getItemById,
  };
};
