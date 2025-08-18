import { useCallback } from 'react';
import { SUCCESS_MESSAGES } from '../constants/messages';
import { participacaoService } from '../services/api';
import type { Participacao } from '../types';
import { useAsyncOperation } from './useAsyncOperation';

export const useParticipacao = () => {
  const { executeOperationWithoutParams, loading } = useAsyncOperation();

  const participarPartida = useCallback(
    async (partidaId: number): Promise<Participacao | null> => {
      try {
        const participacao = await executeOperationWithoutParams(
          () => participacaoService.participarPartida(partidaId),
          SUCCESS_MESSAGES.PARTICIPATION_REGISTERED,
          'Participar da partida',
        );
        return participacao as Participacao;
      } catch {
        return null;
      }
    },
    [executeOperationWithoutParams],
  );

  const cancelarParticipacao = useCallback(
    async (partidaId: number): Promise<boolean> => {
      try {
        await executeOperationWithoutParams(
          () => participacaoService.cancelarParticipacao(partidaId),
          SUCCESS_MESSAGES.PARTICIPATION_CANCELLED,
          'Cancelar participação',
        );
        return true;
      } catch {
        return false;
      }
    },
    [executeOperationWithoutParams],
  );

  const aprovarParticipacao = useCallback(
    async (partidaId: number, participanteId: number): Promise<Participacao | null> => {
      try {
        const participacao = await executeOperationWithoutParams(
          () => participacaoService.aprovarParticipacao(partidaId, participanteId),
          SUCCESS_MESSAGES.PARTICIPATION_APPROVED,
          'Aprovar participação',
        );
        return participacao as Participacao;
      } catch {
        return null;
      }
    },
    [executeOperationWithoutParams],
  );

  const rejeitarParticipacao = useCallback(
    async (partidaId: number, participanteId: number): Promise<Participacao | null> => {
      try {
        const participacao = await executeOperationWithoutParams(
          () => participacaoService.rejeitarParticipacao(partidaId, participanteId),
          SUCCESS_MESSAGES.PARTICIPATION_REJECTED,
          'Rejeitar participação',
        );
        return participacao as Participacao;
      } catch {
        return null;
      }
    },
    [executeOperationWithoutParams],
  );

  return {
    loading,
    participarPartida,
    cancelarParticipacao,
    aprovarParticipacao,
    rejeitarParticipacao,
  };
};
