import { useCallback } from 'react';
import { ServiceFactory } from '../services/ServiceFactory';
import type { Participacao } from '../types';
import { useServiceOperations } from './useServiceOperations';

export const useParticipacao = () => {
  const { loading, executeOperation, executeOperationGeneric } =
    useServiceOperations<Participacao>();
  const participacaoService = ServiceFactory.getInstance().getParticipacaoService();

  const participarPartida = useCallback(
    async (partidaId: number): Promise<Participacao | null> => {
      try {
        const participacao = await executeOperation(
          () => participacaoService.participarPartida(partidaId),
          'Participar da partida',
        );
        return participacao;
      } catch {
        return null;
      }
    },
    [executeOperation],
  );

  const cancelarParticipacao = useCallback(
    async (partidaId: number): Promise<boolean> => {
      try {
        await executeOperationGeneric<void>(
          () => participacaoService.cancelarParticipacao(partidaId),
          'Cancelar participação',
        );
        return true;
      } catch {
        return false;
      }
    },
    [executeOperationGeneric],
  );

  const aprovarParticipacao = useCallback(
    async (partidaId: number, participanteId: number): Promise<Participacao | null> => {
      try {
        const participacao = await executeOperation(
          () => participacaoService.aprovarParticipacao(partidaId, participanteId),
          'Aprovar participação',
        );
        return participacao;
      } catch {
        return null;
      }
    },
    [executeOperation],
  );

  const rejeitarParticipacao = useCallback(
    async (partidaId: number, participanteId: number): Promise<Participacao | null> => {
      try {
        const participacao = await executeOperation(
          () => participacaoService.rejeitarParticipacao(partidaId, participanteId),
          'Rejeitar participação',
        );
        return participacao;
      } catch {
        return null;
      }
    },
    [executeOperation],
  );

  return {
    loading,
    participarPartida,
    cancelarParticipacao,
    aprovarParticipacao,
    rejeitarParticipacao,
  };
};
