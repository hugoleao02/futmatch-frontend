import type {
  PagePartidaResponse,
  Participacao,
  PartidaRequest,
  PartidaResponse,
  PartidaUpdateRequest,
} from '../types';

export interface IPartidaRepository {
  listarPartidas(): Promise<PartidaResponse[]>;
  listarPartidasFuturas(page?: number, size?: number): Promise<PagePartidaResponse>;
  buscarPartidaPorId(id: number): Promise<PartidaResponse>;
  criarPartida(request: PartidaRequest): Promise<PartidaResponse>;
  atualizarPartida(id: number, request: PartidaUpdateRequest): Promise<PartidaResponse>;
  deletarPartida(id: number): Promise<void>;
  participarPartida(id: number): Promise<Participacao>;
  cancelarParticipacao(id: number): Promise<void>;
  aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
  rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
}
