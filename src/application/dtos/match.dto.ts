export interface MatchDTO {
  id: string;
  titulo: string;
  data: string;
  local: string;
  maxJogadores: number;
  jogadoresAtuais: number;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  criadorId: string;
}

export interface CreateMatchDTO {
  titulo: string;
  data: string;
  local: string;
  maxJogadores: number;
}

export interface UpdateMatchDTO {
  titulo?: string;
  data?: string;
  local?: string;
  maxJogadores?: number;
  status?: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
}