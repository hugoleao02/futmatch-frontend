import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import type { IParticipacaoRepository } from '../../domain/repositories/IParticipacaoRepository';
import type { Participacao } from '../../domain/dtos';

// Participar e cancelar via PartidaController (/partidas/{id}/participar, /partidas/{id}/cancelar-participacao)
// Aprovar/rejeitar via ParticipacaoController (/participacoes/partida/{id}/participante/{uid}/...)
export class ParticipacaoRepositoryImpl implements IParticipacaoRepository {
  constructor(private readonly httpClient: IHttpClient) {}

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
