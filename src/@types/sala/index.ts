export interface Sala {
  id: string;
  nome: string;
  descricao?: string;
  dataHora: string;
  local: string;
  numeroParticipantes: number;
  numeroMaximoParticipantes: number;
  criador: string;
  status: string;
}

export interface FiltroSalaDTO {
  nome?: string;
  local?: string;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
}
