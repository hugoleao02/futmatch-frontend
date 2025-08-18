// Tipos específicos para diferentes categorias de erro
export interface AxiosErrorData {
  isAxiosError: true;
  response?: {
    status: number;
    data: {
      message?: string;
      [key: string]: unknown;
    };
    statusText: string;
  };
  request?: unknown;
  message: string;
  code?: string;
}

export interface ValidationErrorData {
  inner: Array<{
    message: string;
    path?: string;
    value?: unknown;
  }>;
  message: string;
  name: string;
}

export interface AuthErrorData {
  message: string;
  statusCode?: number;
  error?: string;
}

// Union type para todos os tipos de erro
export type ErrorData = AxiosErrorData | ValidationErrorData | AuthErrorData | Error | unknown;
