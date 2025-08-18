import { useApiOperations } from './useApiOperations';
import { useGenericOperations } from './useGenericOperations';

export interface ServiceOperationsConfig<T> {
  onSuccess?: (data: T, operation: string) => void;
  onError?: (error: unknown, operation: string) => void;
}

/**
 * Hook composto que combina operações de API e genéricas
 * Usa composição para manter responsabilidades separadas
 */
export const useServiceOperations = <T>(config: ServiceOperationsConfig<T> = {}) => {
  const { loading: apiLoading, executeApiOperation } = useApiOperations<T>(config);
  const { loading: genericLoading, executeGenericOperation } = useGenericOperations<T>(config);

  return {
    loading: apiLoading || genericLoading,
    executeOperation: executeApiOperation,
    executeOperationGeneric: executeGenericOperation,
  };
};
