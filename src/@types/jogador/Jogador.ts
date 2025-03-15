import { PosicaoType } from "../enums";
import { Estatisticas } from "./Estatisticas";

export interface Jogador {
  uuid: string;
  nome: string;
  fotoPerfilUrl: string;
  citacao: string;
  estiloJogo: string;
  ranking: number;
  rankingLocal: number;
  melhorNota: number;
  sequenciaVitorias: number;
  maiorSequenciaVitorias: number;
  avatarPersonalizadoUrl: string | null;
  temaPerfilUrl: string | null;
  badgePersonalizado: string | null;
  tituloDestaque: string | null;
  rankingAmigos: number;
  estatisticas: Estatisticas;
  identificador: string | null;
  nomeCompleto: string | null;
  email: string;
  telefone: string | null;
  nivelCompetitividade: string | null;
  posicao: PosicaoType;
  tipoJogador: string | null;
  notaMedia: number | null;
  totalPartidas: number;
  partidasGanhas: number | null;
  partidasPerdidas: number | null;
  partidasEmpatadas: number | null;
}
