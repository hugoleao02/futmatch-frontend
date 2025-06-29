import { useState } from 'react';
import { toast } from 'react-toastify';
import type { Participacao } from '../../domain/dtos';
import { useContainer } from '../../infra/di/useContainer';

export const useParticipacao = () => {
  const container = useContainer();
  const [loading, setLoading] = useState(false);

  const participarPartida = async (partidaId: number): Promise<Participacao | null> => {
    setLoading(true);
    try {
      const participacao =
        await container.useCases.participacaoUseCase.participarPartida(partidaId);
      toast.success('Participação registrada com sucesso!');
      return participacao;
    } catch (error) {
      toast.error('Erro ao participar da partida');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelarParticipacao = async (partidaId: number): Promise<boolean> => {
    setLoading(true);
    try {
      await container.useCases.participacaoUseCase.cancelarParticipacao(partidaId);
      toast.success('Participação cancelada com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao cancelar participação');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const aprovarParticipacao = async (
    partidaId: number,
    participanteId: number,
  ): Promise<Participacao | null> => {
    setLoading(true);
    try {
      const participacao = await container.useCases.participacaoUseCase.aprovarParticipacao(
        partidaId,
        participanteId,
      );
      toast.success('Participação aprovada com sucesso!');
      return participacao;
    } catch (error) {
      toast.error('Erro ao aprovar participação');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const rejeitarParticipacao = async (
    partidaId: number,
    participanteId: number,
  ): Promise<Participacao | null> => {
    setLoading(true);
    try {
      const participacao = await container.useCases.participacaoUseCase.rejeitarParticipacao(
        partidaId,
        participanteId,
      );
      toast.success('Participação rejeitada com sucesso!');
      return participacao;
    } catch (error) {
      toast.error('Erro ao rejeitar participação');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    participarPartida,
    cancelarParticipacao,
    aprovarParticipacao,
    rejeitarParticipacao,
  };
};
