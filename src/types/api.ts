export interface Jogador {
  id: number;
  apelido: string;
  email: string;
  posicao?: string;
  nivelHabilidade: number;
  pontuacaoFairPlay: number;
  isPremium: boolean;
}

export interface Sala {
  id: number;
  nome: string;
  numeroJogadores: number;
  nivelMinimo: number;
  nivelMaximo: number;
  dataHora: string;
  localizacao: string;
  criadoPor: string;
  jogadores: Jogador[];
  estaAtiva: boolean;
  dataCriacao: string;
}

export interface Partida {
  id: number;
  dataHoraInicio: string;
  dataHoraFim?: string;
  status: string;
  placarTimeA: number;
  placarTimeB: number;
  observacoes?: string;
  sala: Sala;
  timeA: Jogador[];
  timeB: Jogador[];
}

export interface CriarSalaDTO {
  nome: string;
  numeroJogadores: number;
  nivelMinimo: number;
  nivelMaximo: number;
  dataHora: string;
  localizacao: string;
}

export interface CriarJogadorDTO {
  apelido: string;
  email: string;
  senha: string;
  posicao?:
    | "GOLEIRO"
    | "ZAGUEIRO"
    | "LATERAL"
    | "VOLANTE"
    | "MEIA"
    | "ATACANTE";
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface CriarPartidaDTO {
  salaId: number;
  dataHoraInicio: string;
  timeAIds: number[];
  timeBIds: number[];
  observacoes?: string;
}

export interface AtualizarPlacarDTO {
  placarTimeA: number;
  placarTimeB: number;
}
