export interface CriarPartidaDTO {
  titulo: string;
  data: string;
  local: string;
  nivelHabilidade: string;
  maxJogadores: number;
  salaId: number;
  observacoes?: string;
}

export interface AtualizarPlacarDTO {
  placarTimeA: number;
  placarTimeB: number;
}
