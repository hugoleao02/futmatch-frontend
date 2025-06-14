import type { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import type { IStorage } from '../../domain/repositories/IStorage';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../domain/types';
import { STORAGE_KEYS } from '../../shared/constants';

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly storage: IStorage,
  ) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpClient.post<LoginResponse>('/auth/login', loginRequest);
    const { token } = response;
    this.#setToken(token);
    return response;
  }

  async register(registerRequest: RegisterRequest): Promise<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>('/auth/register', registerRequest);
  }

  async logout(): Promise<void> {
    this.#removeToken();
  }

  #setToken(token: string): void {
    this.storage.setItem(STORAGE_KEYS.token, token);
  }

  #removeToken(): void {
    this.storage.removeItem(STORAGE_KEYS.token);
  }
}
