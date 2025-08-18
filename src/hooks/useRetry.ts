import { useCallback, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';

interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
}

interface RetryState {
  attempts: number;
  isRetrying: boolean;
  lastError: unknown;
}

export const useRetry = (config: RetryConfig = {}) => {
  const { maxAttempts = 3, delayMs = 1000, backoffMultiplier = 2 } = config;

  const [retryState, setRetryState] = useState<RetryState>({
    attempts: 0,
    isRetrying: false,
    lastError: null,
  });

  const { isRetryable } = useErrorHandler();

  const executeWithRetry = useCallback(
    async <T>(operation: () => Promise<T>, context?: string): Promise<T> => {
      let lastError: unknown;
      let attempts = 0;

      while (attempts < maxAttempts) {
        try {
          attempts++;
          setRetryState(prev => ({ ...prev, attempts, isRetrying: false }));

          const result = await operation();

          // Sucesso - resetar estado
          setRetryState({
            attempts: 0,
            isRetrying: false,
            lastError: null,
          });

          return result;
        } catch (error) {
          lastError = error;
          setRetryState(prev => ({ ...prev, lastError: error }));

          // Se não é retryable ou atingiu o limite, parar
          if (!isRetryable(error) || attempts >= maxAttempts) {
            break;
          }

          // Aguardar antes da próxima tentativa
          setRetryState(prev => ({ ...prev, isRetrying: true }));

          const delay = delayMs * Math.pow(backoffMultiplier, attempts - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      // Todas as tentativas falharam
      setRetryState({
        attempts: 0,
        isRetrying: false,
        lastError: null,
      });

      throw lastError;
    },
    [maxAttempts, delayMs, backoffMultiplier, isRetryable],
  );

  const resetRetry = useCallback(() => {
    setRetryState({
      attempts: 0,
      isRetrying: false,
      lastError: null,
    });
  }, []);

  return {
    executeWithRetry,
    resetRetry,
    attempts: retryState.attempts,
    isRetrying: retryState.isRetrying,
    lastError: retryState.lastError,
    hasAttempted: retryState.attempts > 0,
  };
};
