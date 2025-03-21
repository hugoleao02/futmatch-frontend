export interface Sala {
  id: string | number;
  nome: string;
  descricao?: string;
  dataHora: string;
  local: string;
  numeroParticipantes: number;
  numeroMaximoParticipantes: number;
  criador: string;
  status: string;
  nivelMinimo?: number;
  nivelMaximo?: number;
  localizacao: string;
  participantes?: any[];
  capacidade: number;
}

export interface FiltroSalaDTO {
  nome?: string;
  local?: string;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
  nivelMinimo?: number;
  nivelMaximo?: number;
  minimoFairPlay?: number;
}

export * from "./CriarSalaDTO";
export * from "./Mensagem";
export * from "./Sala";
