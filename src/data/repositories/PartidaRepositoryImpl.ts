import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import type { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import type {
  PagePartidaResponse,
  Participacao,
  PartidaRequest,
  PartidaResponse,
  PartidaUpdateRequest,
} from '../../domain/dtos';

export class PartidaRepositoryImpl implements IPartidaRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async listarPartidas(): Promise<PartidaResponse[]> {
    return this.httpClient.get<PartidaResponse[]>('/partidas');
  }

  async listarPartidasFuturas(page: number = 0, size: number = 10): Promise<PagePartidaResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    return this.httpClient.get<PagePartidaResponse>(`/partidas/futuras?${params}`);
  }

  async buscarPartidaPorId(id: number): Promise<PartidaResponse> {
    return this.httpClient.get<PartidaResponse>(`/partidas/${id}`);
  }

  async criarPartida(request: PartidaRequest): Promise<PartidaResponse> {
    return this.httpClient.post<PartidaResponse>('/partidas', request);
  }

  async atualizarPartida(id: number, request: PartidaUpdateRequest): Promise<PartidaResponse> {
    return this.httpClient.put<PartidaResponse>(`/partidas/${id}`, request);
  }

  async deletarPartida(id: number): Promise<void> {
    await this.httpClient.delete<void>(`/partidas/${id}`);
  }

  async participarPartida(id: number): Promise<Participacao> {
    return this.httpClient.post<Participacao>(`/partidas/${id}/participar`, {});
  }

  async cancelarParticipacao(id: number): Promise<void> {
    await this.httpClient.delete<void>(`/partidas/${id}/cancelar-participacao`);
  }

  async aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    return this.httpClient.put<Participacao>(
      `/participacoes/partida/${partidaId}/participante/${participanteId}/aprovar`,
      {},
    );
  }

  async rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    return this.httpClient.put<Participacao>(
      `/participacoes/partida/${partidaId}/participante/${participanteId}/rejeitar`,
      {},
    );
  }
}
