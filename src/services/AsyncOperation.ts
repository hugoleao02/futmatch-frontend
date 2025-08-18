import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/messages';
import type { IAsyncOperation } from '../types';
import type { IErrorHandler } from '../types/interfaces';

export interface AsyncOperationConfig {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorContext?: string;
}

/**
 * Classe responsável pela execução de operações assíncronas
 * Responsabilidade única: Executar operações com tratamento de sucesso/erro
 */
export class AsyncOperation<T, P = void> implements IAsyncOperation<T, P> {
  constructor(
    private config: AsyncOperationConfig = {},
    private errorHandler: IErrorHandler,
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
