import { useCallback } from 'react';
import { ErrorService } from '../services/errorService';
import type { ErrorType } from '../stores/errorStore';
import { useErrorStore } from '../stores/errorStore';

export const useErrorHandler = () => {
  const { addError, clearError, clearAllErrors, markAsHandled } = useErrorStore();

  /**
   * Trata um erro de forma centralizada
   */
  const handleError = useCallback(
    (error: unknown, context?: string) => {
      const errorInfo = ErrorService.classifyError(error);

      addError({
        type: errorInfo.type,
        message: errorInfo.message,
        details: context ? `${context}: ${errorInfo.details || ''}` : errorInfo.details,
      });

      // Log técnico para desenvolvimento
      if (import.meta.env.DEV) {
        console.error('Error handled by useErrorHandler:', {
          context,
          error: ErrorService.getTechnicalDetails(error),
          errorInfo,
        });
      }

      return errorInfo;
    },
    [addError],
  );

  /**
   * Trata um erro com tipo específico
   */
  const handleSpecificError = useCallback(
    (error: unknown, type: ErrorType, context?: string) => {
      const errorInfo = ErrorService.classifyError(error);

      addError({
        type,
        message: errorInfo.message,
        details: context ? `${context}: ${errorInfo.details || ''}` : errorInfo.details,
      });

      return errorInfo;
    },
    [addError],
  );

  /**
   * Trata um erro de validação
   */
  const handleValidationError = useCallback(
    (error: unknown, context?: string) => {
      return handleSpecificError(error, 'VALIDATION', context);
    },
    [handleSpecificError],
  );

  /**
   * Trata um erro de autenticação
   */
  const handleAuthError = useCallback(
    (error: unknown, context?: string) => {
      return handleSpecificError(error, 'AUTH', context);
    },
    [handleSpecificError],
  );

  /**
   * Trata um erro de rede
   */
  const handleNetworkError = useCallback(
    (error: unknown, context?: string) => {
      return handleSpecificError(error, 'NETWORK', context);
    },
    [handleSpecificError],
  );

  /**
   * Verifica se um erro pode ser tentado novamente
   */
  const isRetryable = useCallback((error: unknown) => {
    return ErrorService.isRetryable(error);
  }, []);

  /**
   * Obtém uma mensagem amigável para o usuário
   */
  const getUserFriendlyMessage = useCallback((error: unknown) => {
    return ErrorService.getUserFriendlyMessage(error);
  }, []);

  return {
    handleError,
    handleSpecificError,
    handleValidationError,
    handleAuthError,
    handleNetworkError,
    isRetryable,
    getUserFriendlyMessage,
    clearError,
    clearAllErrors,
    markAsHandled,
  };
};
