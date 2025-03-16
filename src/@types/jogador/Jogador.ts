import { PosicaoType } from "../enums";
import { Estatisticas } from "./Estatisticas";

export interface Jogador {
  id: string | number;
  uuid?: string;
  nome: string;
  apelido?: string;
  email: string;
  posicao: PosicaoType;
  fotoPerfilUrl?: string;
  citacao?: string;
  estiloJogo?: string;
  ranking?: number;
  rankingLocal?: number;
  melhorNota?: number;
  sequenciaVitorias?: number;
  maiorSequenciaVitorias?: number;
  avatarPersonalizadoUrl?: string | null;
  temaPerfilUrl?: string | null;
  badgePersonalizado?: string | null;
  tituloDestaque?: string | null;
  rankingAmigos?: number;
  estatisticas?: Estatisticas;
  identificador?: string | null;
  nomeCompleto?: string | null;
  telefone?: string | null;
  nivelCompetitividade?: string | null;
  tipoJogador?: string | null;
  notaMedia?: number | null;
  totalPartidas?: number;
  partidasGanhas?: number | null;
  partidasPerdidas?: number | null;
  partidasEmpatadas?: number | null;
  nivelHabilidade?: number;
  pontuacaoFairPlay?: number;
}
