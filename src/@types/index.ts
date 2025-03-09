export * from "./auth";
export * from "./match";
export * from "./player";
export * from "./components";
export * from "./api";

// Auth
export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegisterDTO {
  nome: string;
  email: string;
  senha: string;
  posicao: PosicaoType;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    posicao: string;
  };
}

// Jogador
export interface Jogador {
  id: string;
  nome: string;
  email: string;
  apelido: string;
  posicao?: PosicaoType;
  nivelHabilidade?: number;
  pontuacaoFairPlay?: number;
}

export interface Estatisticas {
  totalPartidas: number;
  vitorias: number;
  derrotas: number;
  empates: number;
  golsMarcados: number;
  golsSofridos: number;
  fairPlayScore: number;
}

// Form Values
export interface LoginFormValues {
  email: string;
  senha: string;
}

export interface RegisterFormValues {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
  posicao: PosicaoType;
}

// Enums
export type PosicaoType =
  | "GOLEIRO"
  | "ZAGUEIRO"
  | "LATERAL"
  | "VOLANTE"
  | "MEIA"
  | "ATACANTE"
  | undefined;
