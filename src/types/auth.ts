import type { User } from './user';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}
