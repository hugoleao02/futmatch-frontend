export interface ParticipanteInfo {
  id: number;
  nome: string;
  fotoPerfilUrl: string | null;
  status: string;
}

export interface PartidaDetalhesResponse {
  id: number;
  nome: string;
  esporte: string;
  latitude: number | null;
  longitude: number | null;
  nomeLocal?: string | null;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: string;
  criadorId: number;
  criadorNome: string;
  participantesConfirmados: number;
  participantes: ParticipanteInfo[];
  isCriador: boolean;
  isParticipando: boolean;
  hasSolicitado: boolean;
  solicitacoes: ParticipanteInfo[];
  times: unknown[] | null;
}
