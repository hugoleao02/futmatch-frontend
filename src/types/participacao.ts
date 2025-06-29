export interface Participacao {
  id: number;
  usuarioId: number;
  usuarioNome: string;
  partidaId: number;
  partidaNome: string;
  status: string;
  dataParticipacao: string;
}

export interface Participante {
  id: number;
  nome: string;
  avatar?: string;
}

export interface Solicitacao {
  id: number;
  nome: string;
  avatar?: string;
}

export interface Time {
  id: number;
  nome: string;
  jogadores: Participante[];
}
