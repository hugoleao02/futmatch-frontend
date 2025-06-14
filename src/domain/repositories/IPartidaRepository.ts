import type { PartidaRequest, PartidaResponse, PartidaUpdateRequest } from '../types';

export interface IPartidaRepository {
  listarPartidas(): Promise<PartidaResponse[]>;
  criarPartida(request: PartidaRequest): Promise<PartidaResponse>;
  atualizarPartida(id: string, request: PartidaUpdateRequest): Promise<PartidaResponse>;
}
