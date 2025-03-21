import { CriarSalaCommand } from "../../@types/sala/CriarSalaCommand";
import { EnviarMensagemDTO } from "../../@types/sala/EnviarMensagemDTO";
import { FiltroSalaDTO } from "../../@types/sala/FiltroSalaDTO";
import { Mensagem } from "../../@types/sala/Mensagem";
import { Sala } from "../../@types/sala/Sala";
import { API_CONFIG } from "../../config/apiConfig";
import { HttpClient, isApiError } from "../api/HttpClient";

interface ServiceResult<T> {
  data?: T;
  error?: string;
}

export const listarSalas = async (
  filtros?: FiltroSalaDTO
): Promise<ServiceResult<Sala[]>> => {
  try {
    const endpoint = filtros ? "/salas/filtrar" : "/salas";
    const config = filtros ? { params: filtros } : undefined;

    const response = await HttpClient.get<Sala[]>(endpoint, config);
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao listar salas" };
  }
};

export const obterSala = async (id: number): Promise<ServiceResult<Sala>> => {
  try {
    const response = await HttpClient.get<Sala>(`/salas/${id}`);
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        return { error: "Sala não encontrada" };
      } else if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao obter sala" };
  }
};

export const criarSala = async (
  command: CriarSalaCommand
): Promise<ServiceResult<Sala>> => {
  try {
    const commandSemUndefined = Object.fromEntries(
      Object.entries(command).filter(([_, value]) => value !== undefined)
    );

    const camposObrigatorios = [
      "nome",
      "descricao",
      "dataHoraPartida",
      "local",
      "endereco",
      "duracao",
      "numeroMinimoJogadores",
      "maxJogadores",
      "tipoInscricao",
      "tipoJogadorPermitido",
      "permitirSubstituicoesAutomaticas",
      "criadorId",
      "tipoJogo",
      "nivelCompetitividade",
    ];

    const camposFaltantes = camposObrigatorios.filter(
      (campo) => !commandSemUndefined[campo]
    );
    if (camposFaltantes.length > 0) {
      return {
        error: `Campos obrigatórios faltando: ${camposFaltantes.join(", ")}`,
      };
    }

    const response = await HttpClient.post<Sala>(
      API_CONFIG.ENDPOINTS.SALAS,
      commandSemUndefined
    );
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 400) {
        const mensagemErro = error.data?.message || error.message;
        return { error: "Dados da sala inválidos: " + mensagemErro };
      } else if (error.status === 401) {
        return { error: "Não autorizado. Por favor, faça login novamente." };
      } else if (error.status === 500) {
        return {
          error:
            "Erro interno do servidor. Por favor, tente novamente mais tarde.",
        };
      } else if (error.isNetworkError) {
        return {
          error:
            "Não foi possível conectar ao servidor. Verifique sua conexão.",
        };
      }
    }
    return { error: "Erro ao criar sala" };
  }
};

export const entrarNaSala = async (
  salaId: number
): Promise<ServiceResult<Sala>> => {
  try {
    const response = await HttpClient.post<Sala>(`/salas/${salaId}/entrar`);
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        return { error: "Sala não encontrada" };
      } else if (error.status === 400) {
        return { error: "Não é possível entrar nesta sala" };
      } else if (error.status === 401) {
        return { error: "Não autorizado" };
      } else if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao entrar na sala" };
  }
};

export const sairDaSala = async (
  salaId: number
): Promise<ServiceResult<void>> => {
  try {
    await HttpClient.post<void>(`/salas/${salaId}/sair`);
    return { data: undefined };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        return { error: "Sala não encontrada" };
      } else if (error.status === 400) {
        return { error: "Não é possível sair desta sala" };
      } else if (error.status === 401) {
        return { error: "Não autorizado" };
      } else if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao sair da sala" };
  }
};

export const deletarSala = async (
  salaId: number
): Promise<ServiceResult<void>> => {
  try {
    await HttpClient.delete<void>(`/salas/${salaId}`);
    return { data: undefined };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        return { error: "Sala não encontrada" };
      } else if (error.status === 403) {
        return { error: "Você não tem permissão para deletar esta sala" };
      } else if (error.status === 401) {
        return { error: "Não autorizado" };
      } else if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao deletar sala" };
  }
};

export const buscarPorLocalizacao = async (
  localizacao: string
): Promise<ServiceResult<Sala[]>> => {
  try {
    const response = await HttpClient.get<Sala[]>(
      `/salas/buscar?localizacao=${encodeURIComponent(localizacao)}`
    );
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao buscar salas por localização" };
  }
};

export const filtrarSalas = async (
  filtros: FiltroSalaDTO
): Promise<ServiceResult<Sala[]>> => {
  try {
    const response = await HttpClient.get<Sala[]>("/salas/filtrar", {
      params: filtros,
    });
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao filtrar salas" };
  }
};

export const listarMensagens = async (
  salaId: number
): Promise<ServiceResult<Mensagem[]>> => {
  try {
    const response = await HttpClient.get<Mensagem[]>(
      `/salas/${salaId}/mensagens`
    );
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        return { error: "Sala não encontrada" };
      } else if (error.status === 401) {
        return { error: "Não autorizado" };
      } else if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao listar mensagens" };
  }
};

export const enviarMensagem = async (
  mensagemData: EnviarMensagemDTO
): Promise<ServiceResult<Mensagem>> => {
  try {
    const response = await HttpClient.post<Mensagem>(
      `/salas/${mensagemData.salaId}/mensagens`,
      mensagemData
    );
    return { data: response };
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.status === 404) {
        return { error: "Sala não encontrada" };
      } else if (error.status === 400) {
        return { error: "Mensagem inválida" };
      } else if (error.status === 401) {
        return { error: "Não autorizado" };
      } else if (error.isNetworkError) {
        return { error: "Não foi possível conectar ao servidor" };
      }
    }
    return { error: "Erro ao enviar mensagem" };
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
