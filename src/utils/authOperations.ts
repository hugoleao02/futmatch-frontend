import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';
import type { IServicoAutenticacao } from '../types/interfaces';
import { criarEstadoAuth } from './authTransformers';

// Utilitário para operações de autenticação comuns
export class OperacoesAutenticacao {
  constructor(private servicoAuth: IServicoAutenticacao) {}

  /**
   * Executa operação de login com tratamento de erro padronizado
   */
  async executarLogin(
    dados: LoginRequest,
    definirCarregando: (carregando: boolean) => void,
  ): Promise<LoginResponse> {
    definirCarregando(true);
    try {
      const resposta = await this.servicoAuth.fazerLogin(dados);
      return resposta;
    } catch (error) {
      definirCarregando(false);
      throw error;
    }
  }

  /**
   * Executa operação de registro com tratamento de erro padronizado
   */
  async executarRegistro(
    dados: RegisterRequest,
    definirCarregando: (carregando: boolean) => void,
  ): Promise<RegisterResponse> {
    definirCarregando(true);
    try {
      const resposta = await this.servicoAuth.fazerRegistro(dados);
      return resposta;
    } catch (error) {
      definirCarregando(false);
      throw error;
    }
  }

  /**
   * Cria estado de autenticação a partir de qualquer resposta de auth
   */
  criarEstadoAuthDeResposta(resposta: LoginResponse | RegisterResponse) {
    return criarEstadoAuth(resposta);
  }
}
