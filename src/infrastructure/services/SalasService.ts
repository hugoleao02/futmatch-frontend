import { CriarSalaCommand } from "../../@types/sala/CriarSalaCommand";
import { EnviarMensagemDTO } from "../../@types/sala/EnviarMensagemDTO";
import { FiltroSalaDTO } from "../../@types/sala/FiltroSalaDTO";
import { Mensagem } from "../../@types/sala/Mensagem";
import { Sala } from "../../@types/sala/Sala";
import { API_CONFIG } from "../../config/api";
import { HttpClient, isApiError } from "../api/HttpClient";

export const listarSalas = async (filtros?: FiltroSalaDTO): Promise<Sala[]> => {
  try {
    const endpoint = filtros ? "/salas/filtrar" : "/salas";
    const config = filtros ? { params: filtros } : undefined;

    return await HttpClient.get<Sala[]>(endpoint, config);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const obterSala = async (id: number): Promise<Sala> => {
  try {
    return await HttpClient.get<Sala>(`/salas/${id}`);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const criarSala = async (command: CriarSalaCommand): Promise<Sala> => {
  try {
    console.log("Iniciando criação da sala com dados:", command);
    console.log("URL da requisição:", API_CONFIG.ENDPOINTS.SALAS);

    // Remover campos undefined antes de enviar
    const commandSemUndefined = Object.fromEntries(
      Object.entries(command).filter(([_, value]) => value !== undefined)
    );

    const response = await HttpClient.post<Sala>(
      API_CONFIG.ENDPOINTS.SALAS,
      commandSemUndefined
    );
    console.log("Resposta do servidor após criar sala:", response);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao criar sala no serviço:", error);
    if (isApiError(error)) {
      console.error("Detalhes do erro:", {
        status: error.status,
        message: error.message,
        data: error.data,
      });

      if (error.status === 400) {
        throw new Error(
          "Dados da sala inválidos: " + (error.data?.message || error.message)
        );
      } else if (error.status === 401) {
        throw new Error("Não autorizado. Por favor, faça login novamente.");
      } else if (error.status === 500) {
        throw new Error(
          "Erro interno do servidor. Por favor, tente novamente mais tarde. Detalhes: " +
            (error.data?.message || error.message)
        );
      } else if (error.isNetworkError) {
        throw new Error(
          "Não foi possível conectar ao servidor. Verifique sua conexão."
        );
      }
      throw new Error(error.message || "Erro ao criar sala");
    }
    throw error;
  }
};

export const entrarNaSala = async (salaId: number): Promise<Sala> => {
  try {
    return await HttpClient.post<Sala>(`/salas/${salaId}/entrar`);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.status === 400) {
        throw new Error("Não é possível entrar nesta sala");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const sairDaSala = async (salaId: number): Promise<void> => {
  try {
    await HttpClient.post<void>(`/salas/${salaId}/sair`);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.status === 400) {
        throw new Error("Não é possível sair desta sala");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const deletarSala = async (salaId: number): Promise<void> => {
  try {
    await HttpClient.delete<void>(`/salas/${salaId}`);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.status === 403) {
        throw new Error("Você não tem permissão para deletar esta sala");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const buscarPorLocalizacao = async (
  localizacao: string
): Promise<Sala[]> => {
  try {
    return await HttpClient.get<Sala[]>(
      `/salas/buscar?localizacao=${encodeURIComponent(localizacao)}`
    );
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const filtrarSalas = async (filtros: FiltroSalaDTO): Promise<Sala[]> => {
  try {
    return await HttpClient.get<Sala[]>("/salas/filtrar", {
      params: filtros,
    });
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const listarMensagens = async (salaId: number): Promise<Mensagem[]> => {
  try {
    return await HttpClient.get<Mensagem[]>(`/salas/${salaId}/mensagens`);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const enviarMensagem = async (
  mensagemData: EnviarMensagemDTO
): Promise<Mensagem> => {
  try {
    return await HttpClient.post<Mensagem>(
      `/salas/${mensagemData.salaId}/mensagens`,
      mensagemData
    );
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.status === 400) {
        throw new Error("Mensagem inválida");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const SalasServiice = {
  listarSalas,
  obterSala,
  criarSala,
  entrarNaSala,
  sairDaSala,
  deletarSala,
  buscarPorLocalizacao,
  filtrarSalas,
  listarMensagens,
  enviarMensagem,
};
