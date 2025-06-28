import type { IParticipacaoRepository } from '../repositories/IParticipacaoRepository';
import type { Participacao } from '../types';
import type { IParticipacaoUseCase } from './interfaces/IParticipacaoUseCase';

export class ParticipacaoUseCase implements IParticipacaoUseCase {
  constructor(private readonly participacaoRepository: IParticipacaoRepository) {}

  async participarPartida(partidaId: number): Promise<Participacao> {
    return this.participacaoRepository.participarPartida(partidaId);
  }

  async cancelarParticipacao(partidaId: number): Promise<void> {
    return this.participacaoRepository.cancelarParticipacao(partidaId);
  }

  async aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    return this.participacaoRepository.aprovarParticipacao(partidaId, participanteId);
  }

  async rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    return this.participacaoRepository.rejeitarParticipacao(partidaId, participanteId);
  }
}
