// Interfaces para operações assíncronas
export interface IAsyncOperation<T, P = void> {
  execute(
    operation: (params: P) => Promise<T>,
    params: P,
    customSuccessMessage?: string,
    customErrorContext?: string,
  ): Promise<T>;
  executeOperationWithoutParams(
    operation: () => Promise<T>,
    customSuccessMessage?: string,
    customErrorContext?: string,
  ): Promise<T>;
  loading: boolean;
}

export interface IHookResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}
