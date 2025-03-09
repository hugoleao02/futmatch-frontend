import { Jogador } from "../jogador/Jogador";

export interface Sala {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
  capacidade: number;
  dataCriacao: string;
  criadorId: number;
  participantes: number[];
  status: string;
  numeroJogadores?: number;
  nivelMinimo?: number;
  nivelMaximo?: number;
  dataHora?: string;
  minimoFairPlay?: number;
  criador?: {
    id: number;
    nome: string;
    avatar?: string;
  };
  isPublica?: boolean;
  aceitaAutomatico?: boolean;
  jogadores?: any[];
  restricoesPosicao?: Record<string, number>;
  regrasPersonalizadas?: string;
  dataUltimaAtividade?: string;
  moderadores?: any[];
  criadoPor?: string;
}
