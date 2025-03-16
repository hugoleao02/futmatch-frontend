export interface CriarPartidaDTO {
  titulo: string;
  data: string;
  local: string;
  nivelHabilidade: string;
  maxJogadores: number;
  salaId: number;
}

export interface AtualizarPlacarDTO {
  placarTimeA: number;
  placarTimeB: number;
}
