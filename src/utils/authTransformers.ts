import type { LoginResponse, RegisterResponse, User } from '../types';
import { DataTransformers } from './dataTransformers';

// Transformador para dados de autenticação
export const createUserFromAuthResponse = (response: LoginResponse | RegisterResponse): User => ({
  id: response.id,
  nome: response.nome,
  email: response.email,
});

// Transformador para estado de autenticação
export const createAuthState = (response: LoginResponse | RegisterResponse) => ({
  user: createUserFromAuthResponse(response),
  token: response.token,
  isAuthenticated: true,
  loading: false,
});

// Estado limpo de autenticação
export const createEmptyAuthState = () => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
});

// Transformadores compostos usando o utilitário genérico
export const transformAuthResponse = DataTransformers.composeTransformers(
  createUserFromAuthResponse,
  (user: User) => ({ user, isAuthenticated: true, loading: false })
);
