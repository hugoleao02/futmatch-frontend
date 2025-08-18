// ============================================================================
// TIPOS PRINCIPAIS - Re-exportados dos arquivos específicos
// ============================================================================

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth';
import type { Participacao } from './participacao';
import type { PagePartidaResponse, Partida, PartidaRequest, PartidaUpdateRequest } from './partida';
import type { User } from './user';

// Tipos de API
export type * from './api';

// Tipos de autenticação
export type * from './auth';

// Tipos de participação
export type * from './participacao';

// Tipos de partida
export type * from './partida';

// Tipos de usuário
export type * from './user';

// ============================================================================
// INTERFACES - Definidas localmente
// ============================================================================

// Interfaces para autenticação
export interface IAuthenticator {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  register(userData: UserRegistration): Promise<AuthResult>;
  logout(): void;
  validateToken(token: string): Promise<boolean>;
}

export interface IAuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface IAuthActions {
  setLoading(loading: boolean): void;
  clearAuth(): void;
}

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

// Interfaces para serviços de API
export interface IApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  delete(url: string): Promise<void>;
}

export interface IAuthService {
  login(data: LoginRequest): Promise<LoginResponse>;
  register(data: RegisterRequest): Promise<RegisterResponse>;
  logout(): void;
}

export interface IPartidaService {
  listarPartidas(): Promise<Partida[]>;
  listarPartidasFuturas(page?: number, size?: number): Promise<PagePartidaResponse>;
  buscarPartidaPorId(id: number): Promise<Partida>;
  criarPartida(data: PartidaRequest): Promise<Partida>;
  atualizarPartida(id: number, data: PartidaUpdateRequest): Promise<Partida>;
  deletarPartida(id: number): Promise<void>;
}

export interface IParticipacaoService {
  participarPartida(partidaId: number): Promise<Participacao>;
  cancelarParticipacao(partidaId: number): Promise<void>;
  aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
  rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
}

// Interfaces para tratamento de erros
export interface IErrorHandler {
  handleError(error: unknown, context: string): void;
  classifyError(error: unknown): ErrorInfo;
}

// Interfaces para notificações
export interface INotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
  showInfo(message: string): void;
  showWarning(message: string): void;
}

// Interfaces para armazenamento
export interface IStorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

// Interfaces para validação
export interface IValidator<T> {
  validate(data: T): ValidationResult;
}

// Interfaces para roteamento
export interface IRouteGuard {
  canActivate(): boolean;
  redirectTo(): string;
}

// Interfaces para componentes
export interface IComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Interfaces para hooks
export interface IHookResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Tipos auxiliares
export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface UserRegistration {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

export interface ErrorInfo {
  message: string;
  status: number;
  type: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
