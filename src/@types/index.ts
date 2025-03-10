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

// Components
export * from "./components/LogoProps";

// API
export * from "./api/ApiError";

import { Jogador } from "./Jogador";
import { LoginDTO } from "./LoginDTO";
import { RegisterDTO } from "./RegisterDTO";
import { PosicaoType } from "./enums/PosicaoType";
import { TipoJogador } from "./enums/TipoJogador";

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: Jogador;
}

export type { Jogador, LoginDTO, PosicaoType, RegisterDTO, TipoJogador };
