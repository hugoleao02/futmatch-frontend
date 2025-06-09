import type { AuthenticatedUser, UserRole } from '@domain/entities/User';
import type { LoadingState } from './common';

// Estados de autenticação
export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

// Context de autenticação
export interface AuthContextValue {
  // Estado
  user: AuthenticatedUser | null;
  authState: AuthState;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Ações
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<AuthenticatedUser>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>;

  // Reset de senha
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

// Credenciais de login
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Dados de registro
export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Estados de formulário de autenticação
export interface AuthFormState extends LoadingState {
  success?: boolean;
  message?: string;
}

// Tokens de autenticação
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

// Session info
export interface SessionInfo {
  id: string;
  userId: string;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  userAgent: string;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
}

// Informações do dispositivo
export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  location?: string;
}

// Eventos de autenticação
export type AuthEvent =
  | { type: 'LOGIN_SUCCESS'; payload: AuthenticatedUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'TOKEN_REFRESH_SUCCESS'; payload: AuthTokens }
  | { type: 'TOKEN_REFRESH_FAILURE'; payload: string }
  | { type: 'PROFILE_UPDATE_SUCCESS'; payload: Partial<AuthenticatedUser> }
  | { type: 'SESSION_EXPIRED' };

// Permissões
export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  conditions?: Record<string, unknown>;
}

// Hooks de autenticação
export interface UseAuthReturn extends AuthContextValue {
  // Utilitários
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  isSessionExpired: () => boolean;
}
