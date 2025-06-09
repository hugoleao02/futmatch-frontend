import type { IPartidaRepository } from '../../core/repositories/IPartidaRepository';
import type { PartidaRequest, PartidaResponse, PartidaUpdateRequest } from '../../core/types/api';
import { api } from '../../infra/http/api';

export class PartidaRepositoryImpl implements IPartidaRepository {
  async listarPartidas(): Promise<PartidaResponse[]> {
    const response = await api.get<PartidaResponse[]>('/partidas');
    return response.data;
  }

  async criarPartida(request: PartidaRequest): Promise<PartidaResponse> {
    const response = await api.post<PartidaResponse>('/partidas', request);
    return response.data;
  }

  async atualizarPartida(id: string, request: PartidaUpdateRequest): Promise<PartidaResponse> {
    const response = await api.put<PartidaResponse>(`/partidas/${id}`, request);
    return response.data;
  }
}
