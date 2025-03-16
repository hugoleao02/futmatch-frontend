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

export interface ConfiguracoesForm {
  notificacoes: any;
  aparencia: any;
  preferencias: any;
  privacidade: any;
  contato: any;
}

export type ConfiguracaoSection = keyof ConfiguracoesForm;

export const POSICOES: PosicaoOption[] = [
  { value: "GOLEIRO", label: "Goleiro" },
  { value: "ZAGUEIRO", label: "Zagueiro" },
  { value: "LATERAL", label: "Lateral" },
  { value: "VOLANTE", label: "Volante" },
  { value: "MEIA", label: "Meia" },
  { value: "ATACANTE", label: "Atacante" },
];
