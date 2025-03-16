import { Jogador } from "../jogador/Jogador";

export interface CriarSalaDTO {
  nome: string;
  localizacao: string;
  dataHora: string;
  nivelMinimo?: number;
  nivelMaximo?: number;
  capacidade: number;
  status: "ABERTA" | "FECHADA" | "EM_ANDAMENTO" | "FINALIZADA";
  descricao?: string;
  criadoPor?: Jogador;
  restricoesPosicao?: Record<string, number>;
  minimoFairPlay?: number;
}
