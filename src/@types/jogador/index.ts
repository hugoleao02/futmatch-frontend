export interface Jogador {
  id: string | number;
  nome: string;
  email: string;
  posicao: string;
  citacao?: string;
  badgePersonalizado?: string;
  estatisticas?: Estatisticas;
  fotoPerfilUrl?: string;
  estiloJogo?: string;
  ranking?: number;
  rankingLocal?: number;
  melhorNota?: number;
  sequenciaVitorias?: number;
  maiorSequenciaVitorias?: number;
  avatarPersonalizadoUrl?: string;
  temaPerfilUrl?: string;
  tituloDestaque?: string;
}

export interface Estatisticas {
  golsMarcados: number;
  assistencias: number;
  jogos: number;
  vitorias: number;
  derrotas: number;
  empates: number;
  golsSofridos?: number; // para goleiros
  defesasDificeis?: number; // para goleiros
  cleanSheets?: number; // para goleiros
  totalPartidas?: number;
  fairPlayScore?: number;
}
