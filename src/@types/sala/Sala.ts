import { Jogador } from "../jogador/Jogador";

export interface Sala {
  id: string | number;
  nome: string;
  localizacao: string;
  dataHora: string;
  nivelMinimo?: number;
  nivelMaximo?: number;
  capacidade: number;
  status: "ABERTA" | "FECHADA" | "EM_ANDAMENTO" | "FINALIZADA";
  participantes?: Jogador[];
  timeA?: Jogador[];
  timeB?: Jogador[];
  placarTimeA?: number;
  placarTimeB?: number;
  criadoPor?: Jogador;
  descricao?: string;
  dataCriacao?: string;
  dataUltimaAtividade?: string;
  numeroJogadores?: number;
  jogadores?: Jogador[];
  moderadores?: Jogador[];
  regrasPersonalizadas?: string;
  restricoesPosicao?: Record<string, number>;
  minimoFairPlay?: number;
  isPublica?: boolean;
  aceitaAutomatico?: boolean;
}
