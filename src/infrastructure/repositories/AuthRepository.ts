import type { IAuthRepository } from '@domain/repositories/IAuthRepository';
import type { LoginResponse, RegisterResponse } from '@domain/types/api';
import { STORAGE_KEYS } from '@shared/constants/app';
import { api } from '../api';

export class AuthRepository implements IAuthRepository {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { email, senha });
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  async register(data: { nome: string; email: string; senha: string }): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/refresh', { refreshToken });
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  }

  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token });
  }

  private setTokens(token: string, refreshToken?: string): void {
    localStorage.setItem(STORAGE_KEYS.token, token);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
    }
  }

  private clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
  }
}

export const useAuthRepository = () => {
  return new AuthRepository();
};
