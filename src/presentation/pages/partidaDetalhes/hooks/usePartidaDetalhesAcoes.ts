import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContainer } from '../../../../infra/di/useContainer';
import { ROUTES } from '../../../routes/routes';

export function usePartidaDetalhesAcoes(onRefresh: () => void) {
  const { useCases, repositories } = useContainer();
  const navigate = useNavigate();
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [excluindoPartida, setExcluindoPartida] = useState(false);

  function formatarDataHora(dataHora: string) {
    const data = new Date(dataHora);
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  }

  const handleConfirmarPresenca = useCallback(async (partidaId: number) => {
    try {
      await useCases.participacaoUseCase.participarPartida(partidaId);
      toast.success('Presença confirmada!');
      onRefresh();
    } catch {
      toast.error('Erro ao confirmar presença');
    }
  }, [useCases.participacaoUseCase, onRefresh]);

  const handleCancelarPresenca = useCallback(async (partidaId: number) => {
    try {
      await useCases.participacaoUseCase.cancelarParticipacao(partidaId);
      toast.success('Presença cancelada!');
      onRefresh();
    } catch {
      toast.error('Erro ao cancelar presença');
    }
  }, [useCases.participacaoUseCase, onRefresh]);

  // These are placeholder - backend doesn't expose hasSolicitado/solicitacoes fully yet
  const handleSolicitarAcesso = useCallback(async (_partidaId: number) => {
    toast.info('Solicitação de acesso enviada!');
    onRefresh();
  }, [onRefresh]);

  const handleAceitarSolicitacao = useCallback(async (partidaId: number, participanteId: number) => {
    try {
      await useCases.participacaoUseCase.aprovarParticipacao(partidaId, participanteId);
      toast.success('Participação aprovada!');
      onRefresh();
    } catch {
      toast.error('Erro ao aprovar participação');
    }
  }, [useCases.participacaoUseCase, onRefresh]);

  const handleRecusarSolicitacao = useCallback(async (partidaId: number, participanteId: number) => {
    try {
      await useCases.participacaoUseCase.rejeitarParticipacao(partidaId, participanteId);
      toast.success('Participação rejeitada');
      onRefresh();
    } catch {
      toast.error('Erro ao rejeitar participação');
    }
  }, [useCases.participacaoUseCase, onRefresh]);

  // Placeholder - teams sorting not implemented in backend
  const handleSortearTimes = useCallback(async () => {
    toast.info('Sorteio de times em desenvolvimento');
    setSortModalOpen(false);
  }, []);

  const handleExcluirPartida = useCallback(
    async (partidaId: number) => {
      setExcluindoPartida(true);
      try {
        await repositories.partidaRepository.deletarPartida(partidaId);
        setCancelDialogOpen(false);
        toast.success('Partida excluída com sucesso');
        navigate(ROUTES.HOME);
      } catch {
        toast.error('Erro ao excluir partida');
      } finally {
        setExcluindoPartida(false);
      }
    },
    [repositories.partidaRepository, navigate],
  );

  return {
    formatarDataHora,
    sortModalOpen,
    cancelDialogOpen,
    openSortModal: () => setSortModalOpen(true),
    closeSortModal: () => setSortModalOpen(false),
    openCancelDialog: () => setCancelDialogOpen(true),
    closeCancelDialog: () => setCancelDialogOpen(false),
    handleConfirmarPresenca,
    handleCancelarPresenca,
    handleSolicitarAcesso,
    handleAceitarSolicitacao,
    handleRecusarSolicitacao,
    handleSortearTimes,
    handleExcluirPartida,
    excluindoPartida,
  };
}
