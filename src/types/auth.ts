export interface LoginRequest {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  nome: string;
}

export type LoginResponse = AuthResponse;

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export type RegisterResponse = AuthResponse;
