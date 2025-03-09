import { HttpClient } from "../../../infrastructure/api/HttpClient";

export interface Sala {
  id: number;
  nome: string;
  descricao: string;
  capacidade: number;
  jogadores: Jogador[];
  mensagens: Mensagem[];
}

export interface Jogador {
  id: string;
  nome: string;
  posicao?: string;
  avatar?: string;
}

export interface Mensagem {
  id: number;
  texto: string;
  jogador: Jogador;
  dataCriacao: string;
}

export interface EnviarMensagemDTO {
  texto: string;
}

export interface CriarSalaDTO {
  nome: string;
  descricao: string;
  capacidade: number;
}

export const SalasService = {
  listarSalas: async (): Promise<Sala[]> => {
    return await HttpClient.get<Sala[]>("/salas");
  },

  obterSala: async (id: number): Promise<Sala> => {
    return await HttpClient.get<Sala>(`/salas/${id}`);
  },

  criarSala: async (sala: CriarSalaDTO): Promise<Sala> => {
    return await HttpClient.post<Sala>("/salas", sala);
  },

  listarMensagens: async (salaId: number): Promise<Mensagem[]> => {
    return await HttpClient.get<Mensagem[]>(`/salas/${salaId}/mensagens`);
  },

  enviarMensagem: async (
    salaId: number,
    mensagem: EnviarMensagemDTO
  ): Promise<Mensagem> => {
    return await HttpClient.post<Mensagem>(
      `/salas/${salaId}/mensagens`,
      mensagem
    );
  },

  entrarNaSala: async (salaId: number): Promise<void> => {
    await HttpClient.post(`/salas/${salaId}/entrar`, {});
  },

  sairDaSala: async (salaId: number): Promise<void> => {
    await HttpClient.post(`/salas/${salaId}/sair`, {});
  },

  deletarSala: async (salaId: number): Promise<void> => {
    await HttpClient.delete(`/salas/${salaId}`);
  },
};
