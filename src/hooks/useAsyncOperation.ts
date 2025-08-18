import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/messages';
import { useErrorHandler } from './useErrorHandler';

export interface AsyncOperationConfig {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorContext?: string;
}

export const useAsyncOperation = <T, P = void>(config: AsyncOperationConfig = {}) => {
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
    executeOperation,
    executeOperationWithoutParams,
    loading,
  };
};
