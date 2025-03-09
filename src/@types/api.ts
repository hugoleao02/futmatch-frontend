interface JogadorPartida {
  id: string;
  nome: string;
  posicao?: string;
  avatar?: string;
}

export interface CriarPartidaDTO {
  titulo: string;
  data: string;
  dataHora: string;
  local: string;
  timeA: string;
  timeB: string;
  salaId: number;
  maxJogadores: number;
  nivelHabilidade: string;
  status?: string;
  observacoes?: string;
  jogadoresConfirmados: JogadorPartida[];
  jogadoresEspera: JogadorPartida[];
}

export interface AtualizarPlacarDTO {
  placarTimeA: number;
  placarTimeB: number;
}

export interface FiltroPartidaDTO {
  data?: string;
  local?: string;
  status?: string;
}
