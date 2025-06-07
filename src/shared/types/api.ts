import type { PaginationParams, PaginationResponse } from './common';

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Configuração de requisição
export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  withCredentials?: boolean;
}

// Resposta da API
export interface ApiSuccessResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  timestamp: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  status: number;
  timestamp: string;
}

// Tipos para endpoints
export interface ListEndpointParams extends PaginationParams {
  search?: string;
  filters?: Record<string, unknown>;
}

export interface ListEndpointResponse<T> extends PaginationResponse<T> {
  filters?: Record<string, unknown>;
}

// Tipos para refresh token
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

// Tipos para recuperação de senha
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Tipos para upload de arquivos
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// Interceptors
export interface ApiInterceptorConfig {
  onRequest?: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>;
  onRequestError?: (error: unknown) => unknown;
  onResponse?: <T>(
    response: ApiSuccessResponse<T>,
  ) => ApiSuccessResponse<T> | Promise<ApiSuccessResponse<T>>;
  onResponseError?: (error: ApiErrorResponse) => ApiErrorResponse | Promise<ApiErrorResponse>;
}
