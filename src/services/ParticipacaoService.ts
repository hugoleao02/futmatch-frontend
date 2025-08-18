import type { IApiClient, IParticipacaoService, Participacao } from '../types';
import { BaseService } from './BaseService';

export class ParticipacaoService extends BaseService implements IParticipacaoService {
  constructor(httpClient: IApiClient) {
    super(httpClient);
  }

  async participarPartida(partidaId: number): Promise<Participacao> {
    return this.handleRequest(
      () => this.httpClient.post<Participacao>(`/participacoes/partida/${partidaId}`, {}),
      'Participar partida',
    );
  }

  async cancelarParticipacao(partidaId: number): Promise<void> {
    return this.handleRequest(
      () => this.httpClient.delete(`/participacoes/partida/${partidaId}`),
      'Cancelar participação',
    );
  }

  async aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    return this.handleRequest(
      () =>
        this.httpClient.put<Participacao>(
          `/participacoes/partida/${partidaId}/participante/${participanteId}/aprovar`,
          {},
        ),
      'Aprovar participação',
    );
  }

  async rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    return this.handleRequest(
      () =>
        this.httpClient.put<Participacao>(
          `/participacoes/partida/${partidaId}/participante/${participanteId}/rejeitar`,
          {},
        ),
      'Rejeitar participação',
    );
  }
}
