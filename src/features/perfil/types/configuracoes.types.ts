import { PosicaoType } from "../../../@types/enums";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface PosicaoOption {
  value: PosicaoType;
  label: string;
}

export const POSICOES = [
  { value: "GOLEIRO", label: "Goleiro" },
  { value: "ZAGUEIRO", label: "Zagueiro" },
  { value: "LATERAL", label: "Lateral" },
  { value: "VOLANTE", label: "Volante" },
  { value: "MEIA", label: "Meia" },
  { value: "ATACANTE", label: "Atacante" },
];

export const NIVEIS_COMPETITIVIDADE = [
  { value: "CASUAL", label: "Casual" },
  { value: "INTERMEDIATE", label: "Intermediário" },
  { value: "COMPETITIVE", label: "Competitivo" },
  { value: "PROFESSIONAL", label: "Profissional" },
];

export const ESTILOS_JOGO = [
  { value: "OFFENSIVE", label: "Ofensivo" },
  { value: "DEFENSIVE", label: "Defensivo" },
  { value: "BALANCED", label: "Equilibrado" },
  { value: "TACTICAL", label: "Tático" },
  { value: "AGGRESSIVE", label: "Agressivo" },
  { value: "TECHNICAL", label: "Técnico" },
];

export type ConfiguracaoSection =
  | "notificacoes"
  | "aparencia"
  | "preferencias"
  | "privacidade"
  | "contato";

export interface Preferencias {
  posicao: string;
  nivelCompetitividade: string;
  estiloJogo: string;
}

export interface Notificacoes {
  receberNotificacoes: boolean;
  emailNotificacoes: boolean;
  pushNotificacoes: boolean;
}

export interface Aparencia {
  tema: "light" | "dark" | "system";
}

export interface Privacidade {
  perfilPublico: boolean;
  mostrarEstatisticas: boolean;
  mostrarHistorico: boolean;
}

export interface Contato {
  nome: string;
  email: string;
  telefone: string;
  whatsapp: boolean;
  telegram: boolean;
  telegramNumber: string;
  mostrarTelefone: boolean;
}

export interface ConfiguracoesForm {
  notificacoes: Notificacoes;
  aparencia: Aparencia;
  preferencias: Preferencias;
  privacidade: Privacidade;
  contato: Contato;
}
