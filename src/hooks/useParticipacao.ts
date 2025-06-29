import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { participacaoService } from '../services/api';
import type { Participacao } from '../types';

export const useParticipacao = () => {
  const [loading, setLoading] = useState(false);

  const participarPartida = useCallback(async (partidaId: number): Promise<Participacao | null> => {
    setLoading(true);
    try {
      const participacao = await participacaoService.participarPartida(partidaId);
      toast.success('Participação registrada com sucesso!');
      return participacao;
    } catch (_error: unknown) {
      toast.error('Erro ao participar da partida');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelarParticipacao = useCallback(async (partidaId: number): Promise<boolean> => {
    setLoading(true);
    try {
      await participacaoService.cancelarParticipacao(partidaId);
      toast.success('Participação cancelada com sucesso!');
      return true;
    } catch (_error) {
      toast.error('Erro ao cancelar participação');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const aprovarParticipacao = useCallback(
    async (partidaId: number, participanteId: number): Promise<Participacao | null> => {
      setLoading(true);
      try {
        const participacao = await participacaoService.aprovarParticipacao(
          partidaId,
          participanteId,
        );
        toast.success('Participação aprovada com sucesso!');
        return participacao;
      } catch (_error) {
        toast.error('Erro ao aprovar participação');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const rejeitarParticipacao = useCallback(
    async (partidaId: number, participanteId: number): Promise<Participacao | null> => {
      setLoading(true);
      try {
        const participacao = await participacaoService.rejeitarParticipacao(
          partidaId,
          participanteId,
        );
        toast.success('Participação rejeitada com sucesso!');
        return participacao;
      } catch (_error) {
        toast.error('Erro ao rejeitar participação');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    participarPartida,
    cancelarParticipacao,
    aprovarParticipacao,
    rejeitarParticipacao,
  };
};
