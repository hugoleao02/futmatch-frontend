import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import type { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import type { PartidaRequest, PartidaResponse, PartidaUpdateRequest } from '../../domain/types';

export class PartidaRepositoryImpl implements IPartidaRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async listarPartidas(): Promise<PartidaResponse[]> {
    return this.httpClient.get<PartidaResponse[]>('/partidas');
  }

  async criarPartida(request: PartidaRequest): Promise<PartidaResponse> {
    return this.httpClient.post<PartidaResponse>('/partidas', request);
  }

  async atualizarPartida(id: string, request: PartidaUpdateRequest): Promise<PartidaResponse> {
    return this.httpClient.put<PartidaResponse>(`/partidas/${id}`, request);
  }

  async deletarPartida(id: string): Promise<void> {
    await this.httpClient.delete<void>(`/partidas/${id}`);
  }
}
