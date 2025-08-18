import type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '../types';
import type { IAuthService } from '../types/interfaces';
import { createAuthState } from './authTransformers';

// Utilitário para operações de autenticação comuns
export class AuthOperations {
  constructor(private authService: IAuthService) {}

  /**
   * Executa operação de login com tratamento de erro padronizado
   */
  async executeLogin(data: LoginRequest, setLoading: (loading: boolean) => void): Promise<LoginResponse> {
    setLoading(true);
    try {
      const response = await this.authService.login(data);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  /**
   * Executa operação de registro com tratamento de erro padronizado
   */
  async executeRegister(data: RegisterRequest, setLoading: (loading: boolean) => void): Promise<RegisterResponse> {
    setLoading(true);
    try {
      const response = await this.authService.register(data);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  /**
   * Cria estado de autenticação a partir de qualquer resposta de auth
   */
  createAuthStateFromResponse(response: LoginResponse | RegisterResponse) {
    return createAuthState(response);
  }
}
