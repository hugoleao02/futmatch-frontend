export * from "./enums";

// Auth
export * from "./auth/AuthResponse";
export * from "./auth/LoginDTO";
export * from "./auth/RegisterDTO";

// Forms
export * from "./forms/FormularioCadastro";
export * from "./forms/FormularioLogin";

// Jogador
export * from "./jogador/Estatisticas";
export * from "./jogador/Jogador";

// Partida
export * from "./partida/CriarPartidaDTO";
export * from "./partida/FiltroPartidaDTO";
export * from "./partida/Partida";
export * from "./partida/PartidaDestaque";

// Sala
export * from "./sala/CriarSalaDTO";
export * from "./sala/Mensagem";
export * from "./sala/Sala";

// Profile
export * from "./profile/FotoPerfilResponse";

// Components
export * from "./components/LogoProps";

// API
export * from "./api/ApiError";

import { LoginDTO } from "./LoginDTO";
import { RegisterDTO } from "./RegisterDTO";
import { PosicaoType } from "./enums/PosicaoType";
import { TipoJogador } from "./enums/TipoJogador";

export interface Estatisticas {
  totalPartidas: number;
  totalVitorias: number;
  totalEmpates: number;
  totalDerrotas: number;
  totalGols: number;
  totalAssistencias: number;
  tempoTotalJogo: number;
  mediaNotas: number;
  taxaConversaoChutes: number;
  precisaoPasses: number;
  totalDesarmes: number;
  totalInterceptacoes: number;
}

export interface Jogador {
  id: number;
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

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: Jogador;
}

export type { LoginDTO, PosicaoType, RegisterDTO, TipoJogador };
