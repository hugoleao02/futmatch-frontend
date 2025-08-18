import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/messages';
import type { IAsyncOperation } from '../types';
import { useErrorHandler } from './useErrorHandler';

export interface AsyncOperationConfig {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorContext?: string;
}

export class AsyncOperation<T, P = void> implements IAsyncOperation<T, P> {
  constructor(
    private config: AsyncOperationConfig = {},
    private errorHandler: { handleError: (error: unknown, context: string) => void },
  ) {}

  async execute(
    operation: (params: P) => Promise<T>,
    params: P,
    customSuccessMessage?: string,
    customErrorContext?: string,
  ): Promise<T> {
    try {
      const result = await operation(params);
      this.showSuccessToast(customSuccessMessage);
      return result;
    } catch (error) {
      this.handleError(error, customErrorContext);
      throw error;
    }
  }

  async executeOperationWithoutParams(
    operation: () => Promise<T>,
    customSuccessMessage?: string,
    customErrorContext?: string,
  ): Promise<T> {
    return this.execute(
      () => operation(),
      undefined as P,
      customSuccessMessage,
      customErrorContext,
    );
  }

  private showSuccessToast(customSuccessMessage?: string): void {
    const { showSuccessToast = true, successMessage } = this.config;
    if (showSuccessToast && (customSuccessMessage || successMessage)) {
      toast.success(customSuccessMessage || successMessage || 'Operação realizada com sucesso!');
    }
  }

  private handleError(error: unknown, customErrorContext?: string): void {
    const { showErrorToast = false, errorContext = 'Operação' } = this.config;

    if (showErrorToast) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
    }

    this.errorHandler.handleError(error, customErrorContext || errorContext);
  }

  get loading(): boolean {
    return false; // Esta implementação não mantém estado de loading
  }
}

export const useAsyncOperation = <T, P = void>(
  config: AsyncOperationConfig = {},
): IAsyncOperation<T, P> => {
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();

  const {
    showSuccessToast = true,
    showErrorToast = false,
    successMessage,
    errorContext = 'Operação',
  } = config;

  const executeOperation = useCallback(
    async (
      operation: (params: P) => Promise<T>,
      params: P,
      customSuccessMessage?: string,
      customErrorContext?: string,
    ): Promise<T> => {
      setLoading(true);
      try {
        const result = await operation(params);

        if (showSuccessToast && (customSuccessMessage || successMessage)) {
          toast.success(
            customSuccessMessage || successMessage || 'Operação realizada com sucesso!',
          );
        }

        return result;
      } catch (error) {
        const context = customErrorContext || errorContext;

        if (showErrorToast) {
          toast.error(ERROR_MESSAGES.GENERIC_ERROR);
        }

        handleError(error, context);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError, showSuccessToast, showErrorToast, successMessage, errorContext],
  );

  const executeOperationWithoutParams = useCallback(
    async (
      operation: () => Promise<T>,
      customSuccessMessage?: string,
      customErrorContext?: string,
    ): Promise<T> => {
      return executeOperation(
        () => operation(),
        undefined as P,
        customSuccessMessage,
        customErrorContext,
      );
    },
    [executeOperation],
  );

  return {
    execute: executeOperation,
    executeOperationWithoutParams,
    loading,
  };
};
