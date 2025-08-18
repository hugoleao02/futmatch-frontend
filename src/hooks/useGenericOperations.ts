import { useCallback } from 'react';
import { useAsyncOperation } from './useAsyncOperation';

export interface GenericOperationsConfig<T> {
  onSuccess?: (data: T, operation: string) => void;
  onError?: (error: unknown, operation: string) => void;
}

/**
 * Hook específico para operações genéricas com type casting
 * Responsabilidade única: Executar operações com tipos genéricos diferentes
 */
export const useGenericOperations = <T>(config: GenericOperationsConfig<T> = {}) => {
  const { executeOperationWithoutParams, loading } = useAsyncOperation<T>();
  const { onSuccess, onError } = config;

  const executeGenericOperation = useCallback(
    async <R>(operation: () => Promise<R>, operationName: string): Promise<R> => {
      try {
        const response = await executeOperationWithoutParams(
          () => operation().then(result => result as unknown as T),
          operationName,
        );
        onSuccess?.(response, operationName);
        return response as unknown as R;
      } catch (error) {
        onError?.(error, operationName);
        throw error;
      }
    },
    [executeOperationWithoutParams, onSuccess, onError],
  );

  return {
    loading,
    executeGenericOperation,
  };
};
