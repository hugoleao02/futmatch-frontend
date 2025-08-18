import type {
  IApiClient,
  IAuthService,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types';
import { BaseService } from './BaseService';

export class AuthService extends BaseService implements IAuthService {
  constructor(httpClient: IApiClient) {
    super(httpClient);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.handleRequest(
      () => this.httpClient.post<LoginResponse>('/auth/login', data),
      'Login',
    );
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.handleRequest(
      () => this.httpClient.post<RegisterResponse>('/auth/register', data),
      'Registro',
    );
  }

  logout(): void {
    // O logout agora é gerenciado pela store do Zustand
    // Este método pode ser removido se não for usado em outros lugares
  }
}
