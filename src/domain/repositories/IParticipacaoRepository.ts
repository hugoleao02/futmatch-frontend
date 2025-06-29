import type { Participacao } from '../dtos';

export interface IParticipacaoRepository {
  participarPartida(partidaId: number): Promise<Participacao>;
  cancelarParticipacao(partidaId: number): Promise<void>;
  aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
  rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
}
