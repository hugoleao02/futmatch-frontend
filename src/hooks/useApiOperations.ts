import { useCallback } from 'react';
import { useAsyncOperation } from './useAsyncOperation';

export interface ApiOperationsConfig<T> {
  onSuccess?: (data: T, operation: string) => void;
  onError?: (error: unknown, operation: string) => void;
}

/**
 * Hook específico para operações de API
 * Responsabilidade única: Executar operações de API com tratamento de sucesso/erro
 */
export const useApiOperations = <T>(config: ApiOperationsConfig<T> = {}) => {
  const { executeOperationWithoutParams, loading } = useAsyncOperation<T>();
  const { onSuccess, onError } = config;

  const executeApiOperation = useCallback(
    async (operation: () => Promise<T>, operationName: string): Promise<T> => {
      try {
        const response = await executeOperationWithoutParams(operation, operationName);
        onSuccess?.(response, operationName);
        return response;
      } catch (error) {
        onError?.(error, operationName);
        throw error;
      }
    },
    [executeOperationWithoutParams, onSuccess, onError],
  );

  return {
    loading,
    executeApiOperation,
  };
};
