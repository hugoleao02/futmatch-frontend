import type { LoginResponse, RegisterResponse } from '../types/api';

export interface IAuthRepository {
  login(email: string, senha: string): Promise<LoginResponse>;
  register(nome: string, email: string, senha: string): Promise<RegisterResponse>;
  logout(): Promise<void>;
} 