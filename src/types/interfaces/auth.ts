import type { User } from '../user';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../auth';

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

export interface IAuthService {
  login(data: LoginRequest): Promise<LoginResponse>;
  register(data: RegisterRequest): Promise<RegisterResponse>;
  logout(): void;
}

// Tipos auxiliares para autenticação
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
