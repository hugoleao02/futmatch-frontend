import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import type { IParticipacaoRepository } from '../../domain/repositories/IParticipacaoRepository';
import type { Participacao } from '../../domain/types';

export class ParticipacaoRepositoryImpl implements IParticipacaoRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async participarPartida(partidaId: number): Promise<Participacao> {
    return this.httpClient.post<Participacao>(`/participacoes/partida/${partidaId}`, {});
  }

  async cancelarParticipacao(partidaId: number): Promise<void> {
    await this.httpClient.delete<void>(`/participacoes/partida/${partidaId}`);
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
