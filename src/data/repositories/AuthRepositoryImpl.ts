import { api } from '../../infra/http/api';
import { STORAGE_KEYS } from '../../shared/constants';
import type { IAuthRepository } from '../../domain/repositories/IAuthRepository.ts';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../domain/types';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', loginRequest);
    const { token } = response.data;

    // Salva o token no localStorage
    localStorage.setItem(STORAGE_KEYS.token, token);

    return response.data;
  }

  async register(registerRequest:RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', registerRequest);
    return response.data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.token);
  }
}
