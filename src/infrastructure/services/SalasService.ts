import { HttpClient, ApiError } from "../api/HttpClient";
import { API_CONFIG } from "../../config/api";

export interface Sala {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
  capacidade: number;
  dataCriacao: string;
  criadorId: number;
  participantes: number[];
  status: string;
  numeroJogadores?: number;
  nivelMinimo?: number;
  nivelMaximo?: number;
  dataHora?: string;
  minimoFairPlay?: number;
  criador?: {
    id: number;
    nome: string;
    avatar?: string;
  };
}

export interface CriarSalaDTO {
  nome: string;
  descricao: string;
  localizacao: string;
  capacidade: number;
}

export interface Mensagem {
  id: number;
  conteudo: string;
  dataEnvio: string;
  jogadorId: number;
  jogadorNome: string;
  salaId: number;
}

export interface EnviarMensagemDTO {
  conteudo: string;
  salaId: number;
}

export interface FiltroSalaDTO {
  localizacao?: string;
  nivelMinimo?: number;
  nivelMaximo?: number;
  minimoFairPlay?: number;
  busca?: string;
}

// Criar uma instância do HttpClient
const httpClient = new HttpClient(API_CONFIG.BASE_URL);

// Funções do serviço
export const listarSalas = async (filtros?: FiltroSalaDTO): Promise<Sala[]> => {
  try {
    const endpoint = filtros ? "/salas/filtrar" : "/salas";
    const config = filtros ? { params: filtros } : undefined;

    return await httpClient.get<Sala[]>(endpoint, config);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const obterSala = async (id: number): Promise<Sala> => {
  try {
    return await httpClient.get<Sala>(`/salas/${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Sala não encontrada");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const criarSala = async (salaData: CriarSalaDTO): Promise<Sala> => {
  try {
    return await httpClient.post<Sala>("/salas", salaData);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        throw new Error("Dados da sala inválidos");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const entrarNaSala = async (salaId: number): Promise<Sala> => {
  try {
    return await httpClient.post<Sala>(`/salas/${salaId}/entrar`);
  } catch (error) {
    if (error instanceof ApiError) {
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
    await httpClient.post<void>(`/salas/${salaId}/sair`);
  } catch (error) {
    if (error instanceof ApiError) {
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
    await httpClient.delete<void>(`/salas/${salaId}`);
  } catch (error) {
    if (error instanceof ApiError) {
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
    return await httpClient.get<Sala[]>(
      `/salas/buscar?localizacao=${encodeURIComponent(localizacao)}`
    );
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const filtrarSalas = async (filtros: FiltroSalaDTO): Promise<Sala[]> => {
  try {
    return await httpClient.get<Sala[]>("/salas/filtrar", {
      params: filtros,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const listarMensagens = async (salaId: number): Promise<Mensagem[]> => {
  try {
    return await httpClient.get<Mensagem[]>(`/salas/${salaId}/mensagens`);
  } catch (error) {
    if (error instanceof ApiError) {
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
    return await httpClient.post<Mensagem>(
      `/salas/${mensagemData.salaId}/mensagens`,
      mensagemData
    );
  } catch (error) {
    if (error instanceof ApiError) {
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

export const SalasService = {
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
