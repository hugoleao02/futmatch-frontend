import type {
  IApiClient,
  IPartidaService,
  PagePartidaResponse,
  Partida,
  PartidaRequest,
  PartidaUpdateRequest,
} from '../types';
import { BaseService } from './BaseService';

export class PartidaService extends BaseService implements IPartidaService {
  constructor(httpClient: IApiClient) {
    super(httpClient);
  }

  async listarPartidas(): Promise<Partida[]> {
    return this.handleRequest(() => this.httpClient.get<Partida[]>('/partidas'), 'Listar partidas');
  }

  async listarPartidasFuturas(page = 0, size = 10): Promise<PagePartidaResponse> {
    const url = this.createUrl('/partidas/futuras', { page, size });
    return this.handleRequest(
      () => this.httpClient.get<PagePartidaResponse>(url),
      'Listar partidas futuras',
    );
  }

  async buscarPartidaPorId(id: number): Promise<Partida> {
    return this.handleRequest(
      () => this.httpClient.get<Partida>(`/partidas/${id}`),
      'Buscar partida por ID',
    );
  }

  async criarPartida(data: PartidaRequest): Promise<Partida> {
    return this.handleRequest(
      () => this.httpClient.post<Partida>('/partidas', data),
      'Criar partida',
    );
  }

  async atualizarPartida(id: number, data: PartidaUpdateRequest): Promise<Partida> {
    return this.handleRequest(
      () => this.httpClient.put<Partida>(`/partidas/${id}`, data),
      'Atualizar partida',
    );
  }

  async deletarPartida(id: number): Promise<void> {
    return this.handleRequest(() => this.httpClient.delete(`/partidas/${id}`), 'Deletar partida');
  }
}
