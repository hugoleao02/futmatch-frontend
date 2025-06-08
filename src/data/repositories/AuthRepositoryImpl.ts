import type { IAuthRepository } from '../../core/repositories/IAuthRepository';
import type { LoginResponse, RegisterResponse } from '../../core/types/api';
import { api } from '../../infra/http/api';
import { STORAGE_KEYS } from '../../shared/constants/app';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { email, senha });
    const { token } = response.data;

    // Salva o token no localStorage
    localStorage.setItem(STORAGE_KEYS.token, token);

    return response.data;
  }

  async register(nome: string, email: string, senha: string): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', { nome, email, senha });
    return response.data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.token);
  }
}
