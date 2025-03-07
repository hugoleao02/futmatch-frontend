import { HttpClient, ApiError } from "../api/HttpClient";
import { API_CONFIG } from "../../config/api";
import { User } from "../../core/domain/entities/User";
import { UserAdapter } from "../adapters/UserAdapter";

export interface AtualizarPerfilDTO {
  apelido?: string;
  nome?: string;
  posicao?: string;
  avatar?: string;
}

export interface PartidaResumo {
  id: number;
  data: string;
  local: string;
  resultado: string;
  avaliacao: number;
}

export interface Estatisticas {
  totalPartidas: number;
  vitorias: number;
  derrotas: number;
  empates: number;
  golsMarcados: number;
  golsSofridos: number;
  saldoGols: number;
  aproveitamento: number;
  gols: number;
  assistencias: number;
  fairPlayScore: number;
  mediaAvaliacao: number;
  partidasOrganizadas: number;
  cidade: string;
  ultimasPartidas: PartidaResumo[];
}

export class PerfilService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(API_CONFIG.BASE_URL);
  }

  async obterPerfil(): Promise<User> {
    try {
      const response = await this.httpClient.get<any>("/jogadores/me");
      return UserAdapter.fromApiResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          throw new Error("Não autorizado");
        } else if (error.isNetworkError) {
          throw new Error("Não foi possível conectar ao servidor");
        }
      }
      throw error;
    }
  }

  async obterJogadorPorId(id: number): Promise<User> {
    try {
      const response = await this.httpClient.get<any>(`/jogadores/${id}`);
      return UserAdapter.fromApiResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error("Jogador não encontrado");
        } else if (error.isNetworkError) {
          throw new Error("Não foi possível conectar ao servidor");
        }
      }
      throw error;
    }
  }

  async atualizarPerfil(perfilData: AtualizarPerfilDTO): Promise<User> {
    try {
      const response = await this.httpClient.put<any>(
        "/jogadores/me",
        perfilData
      );
      return UserAdapter.fromApiResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400) {
          throw new Error("Dados do perfil inválidos");
        } else if (error.status === 401) {
          throw new Error("Não autorizado");
        } else if (error.isNetworkError) {
          throw new Error("Não foi possível conectar ao servidor");
        }
      }
      throw error;
    }
  }

  async obterEstatisticas(jogadorId?: number): Promise<Estatisticas> {
    try {
      const endpoint = jogadorId
        ? `/jogadores/${jogadorId}/estatisticas`
        : "/jogadores/me/estatisticas";

      return await this.httpClient.get<Estatisticas>(endpoint);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error("Jogador não encontrado");
        } else if (error.status === 401) {
          throw new Error("Não autorizado");
        } else if (error.isNetworkError) {
          throw new Error("Não foi possível conectar ao servidor");
        }
      }
      throw error;
    }
  }
}
