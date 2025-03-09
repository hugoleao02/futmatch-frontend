import { HttpClient, IApiError, isApiError } from "../api/HttpClient";
import { toJogador } from "../adapters/UserAdapter";
import { Jogador, Estatisticas } from "../../@types";

export const obterPerfil = async (): Promise<Jogador> => {
  try {
    const response = await HttpClient.get<any>("/jogadores/me");
    return toJogador(response);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const obterJogadorPorId = async (id: number): Promise<Jogador> => {
  try {
    const response = await HttpClient.get<any>(`/jogadores/${id}`);
    return toJogador(response);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Jogador não encontrado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const atualizarPerfil = async (
  perfilData: Jogador
): Promise<Jogador> => {
  try {
    const response = await HttpClient.put<any>("/jogadores/me", perfilData);
    return toJogador(response);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
};

export const obterEstatisticas = async (
  jogadorId?: number
): Promise<Estatisticas> => {
  try {
    const endpoint = jogadorId
      ? `/jogadores/${jogadorId}/estatisticas`
      : "/jogadores/me/estatisticas";

    return await HttpClient.get<Estatisticas>(endpoint);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
};

export const PerfilService = {
  obterPerfil,
  obterJogadorPorId,
  atualizarPerfil,
  obterEstatisticas,
};
