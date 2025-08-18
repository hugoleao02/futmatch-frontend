import type { ErrorType } from '../stores/errorStore';

export interface ErrorInfo {
  type: ErrorType;
  message: string;
  details?: string;
  retryable: boolean;
  userAction?: string;
}

export class ErrorService {
  /**
   * Classifica um erro baseado em sua natureza
   */
  static classifyError(error: unknown): ErrorInfo {
    // Erro de rede/axios
    if (this.isAxiosError(error)) {
      return this.handleAxiosError(error);
    }

    // Erro de validação (Yup, etc.)
    if (this.isValidationError(error)) {
      return this.handleValidationError(error);
    }

    // Erro de autenticação
    if (this.isAuthError(error)) {
      return this.handleAuthError(error);
    }

    // Erro genérico
    return this.handleGenericError(error);
  }

  /**
   * Verifica se é um erro do Axios
   */
  private static isAxiosError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'isAxiosError' in error &&
      (error as any).isAxiosError === true
    );
  }

  /**
   * Trata erros do Axios
   */
  private static handleAxiosError(error: any): ErrorInfo {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Erro de conexão';

    switch (status) {
      case 400:
        return {
          type: 'VALIDATION',
          message: 'Dados inválidos fornecidos',
          details: message,
          retryable: false,
          userAction: 'Verifique os dados e tente novamente',
        };

      case 401:
        return {
          type: 'AUTH',
          message: 'Sessão expirada ou inválida',
          details: message,
          retryable: false,
          userAction: 'Faça login novamente',
        };

      case 403:
        return {
          type: 'AUTH',
          message: 'Acesso negado',
          details: message,
          retryable: false,
          userAction: 'Verifique suas permissões',
        };

      case 404:
        return {
          type: 'SERVER',
          message: 'Recurso não encontrado',
          details: message,
          retryable: false,
          userAction: 'Verifique se o recurso existe',
        };

      case 422:
        return {
          type: 'VALIDATION',
          message: 'Dados inválidos',
          details: message,
          retryable: false,
          userAction: 'Corrija os dados e tente novamente',
        };

      case 429:
        return {
          type: 'SERVER',
          message: 'Muitas requisições',
          details: message,
          retryable: true,
          userAction: 'Aguarde um momento e tente novamente',
        };

      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: 'SERVER',
          message: 'Erro interno do servidor',
          details: message,
          retryable: true,
          userAction: 'Tente novamente em alguns minutos',
        };

      default:
        if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
          return {
            type: 'NETWORK',
            message: 'Erro de conexão',
            details: 'Verifique sua conexão com a internet',
            retryable: true,
            userAction: 'Verifique sua conexão e tente novamente',
          };
        }

        return {
          type: 'UNKNOWN',
          message: 'Erro inesperado',
          details: message,
          retryable: false,
          userAction: 'Tente novamente ou entre em contato com o suporte',
        };
    }
  }

  /**
   * Verifica se é um erro de validação
   */
  private static isValidationError(error: unknown): boolean {
    return (
      (typeof error === 'object' &&
        error !== null &&
        'name' in error &&
        (error as any).name === 'ValidationError') ||
      (typeof error === 'object' &&
        error !== null &&
        'inner' in error &&
        Array.isArray((error as any).inner))
    );
  }

  /**
   * Trata erros de validação
   */
  private static handleValidationError(error: any): ErrorInfo {
    let message = 'Dados inválidos';
    let details: string | undefined;

    if (error.inner && Array.isArray(error.inner)) {
      details = error.inner.map((e: any) => e.message).join(', ');
    } else if (error.message) {
      details = error.message;
    }

    return {
      type: 'VALIDATION',
      message,
      details,
      retryable: false,
      userAction: 'Corrija os dados e tente novamente',
    };
  }

  /**
   * Verifica se é um erro de autenticação
   */
  private static isAuthError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      ((error as any).message.includes('token') ||
        (error as any).message.includes('autenticação') ||
        (error as any).message.includes('login'))
    );
  }

  /**
   * Trata erros de autenticação
   */
  private static handleAuthError(error: any): ErrorInfo {
    return {
      type: 'AUTH',
      message: 'Erro de autenticação',
      details: error.message,
      retryable: false,
      userAction: 'Faça login novamente',
    };
  }

  /**
   * Trata erros genéricos
   */
  private static handleGenericError(error: unknown): ErrorInfo {
    const message = error instanceof Error ? error.message : String(error);

    return {
      type: 'UNKNOWN',
      message: 'Erro inesperado',
      details: message,
      retryable: false,
      userAction: 'Tente novamente ou entre em contato com o suporte',
    };
  }

  /**
   * Verifica se um erro pode ser tentado novamente
   */
  static isRetryable(error: unknown): boolean {
    const errorInfo = this.classifyError(error);
    return errorInfo.retryable;
  }

  /**
   * Obtém uma mensagem amigável para o usuário
   */
  static getUserFriendlyMessage(error: unknown): string {
    const errorInfo = this.classifyError(error);
    return errorInfo.message;
  }

  /**
   * Obtém detalhes técnicos do erro (para logs)
   */
  static getTechnicalDetails(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack || ''}`;
    }
    return String(error);
  }
}
