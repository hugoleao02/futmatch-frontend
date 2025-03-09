export interface CriarPartidaDTO {
  titulo: string;
  data: string;
  local: string;
  maxJogadores: number;
  nivelHabilidade?: string;
  observacoes?: string;
}

export interface AtualizarPlacarDTO {
  placarTimeA: number;
  placarTimeB: number;
}
