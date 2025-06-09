import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../../infra/http/api';
import { ROUTES } from '../../../routes/routes';
import type { PartidaDetalhes, Time } from '../types';

export function useMatchDetailsPageHandlers() {
  const [openSortModal, setOpenSortModal] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [numTimes, setNumTimes] = useState(2);
  const [loadingSort, setLoadingSort] = useState(false);
  const navigate = useNavigate();
  const [partida, setPartida] = useState<PartidaDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: matchId = '' } = useParams<{ id: string }>();

  function formatarDataHora(dataHora: string) {
    const data = new Date(dataHora);
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  }

  function handleBack() {
    window.history.back();
  }

  function handleOpenSortModal() {
    setOpenSortModal(true);
  }

  function handleCloseSortModal() {
    setOpenSortModal(false);
  }

  function handleCreatorMenuClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCreatorMenuClose() {
    setAnchorEl(null);
  }

  function handleEditarPartida() {
    handleCreatorMenuClose();
    if (partida && partida.id) {
      navigate(ROUTES.MATCH.EDIT.replace(':id', partida.id));
    }
  }

  function handleOpenCancelDialog() {
    handleCreatorMenuClose();
    setOpenCancelDialog(true);
  }

  function handleCloseCancelDialog() {
    setOpenCancelDialog(false);
  }

  function handleConfirmarCancelamento() {
    handleCancelarPartida();
    handleCloseCancelDialog();
  }

  async function realizarSorteioTimes() {
    handleSortearTimes(numTimes);
  }

  useEffect(() => {
    carregarDetalhesPartida();
  }, [matchId]);

  const carregarDetalhesPartida = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('futmatch_token');
      console.log('Token na requisição:', token);

      const response = await api.get<PartidaDetalhes>(`/partidas/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Resposta da API:', response.data);
      setPartida(response.data);
      setError(null);
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      setError(error.response?.data?.message || 'Erro ao carregar detalhes da partida');
      toast.error(error.response?.data?.message || 'Erro ao carregar detalhes da partida');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarPresenca = async () => {
    if (!partida) return;

    try {
      await api.post(`/partidas/${matchId}/participar`);
      setPartida(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isParticipando: true,
          participantesConfirmados: (prev.participantesConfirmados || 0) + 1,
        };
      });
      toast.success('Presença confirmada com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao confirmar presença');
    }
  };

  const handleCancelarPresenca = async () => {
    if (!partida) return;

    try {
      await api.delete(`/partidas/${matchId}/participar`);
      setPartida(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isParticipando: false,
          participantesConfirmados: (prev.participantesConfirmados || 0) - 1,
        };
      });
      toast.success('Presença cancelada com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cancelar presença');
    }
  };

  const handleSolicitarAcesso = async () => {
    if (!partida) return;

    try {
      await api.post(`/partidas/${matchId}/solicitar-acesso`);
      setPartida(prev => {
        if (!prev) return null;
        return {
          ...prev,
          hasSolicitado: true,
        };
      });
      toast.success('Solicitação de acesso enviada com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao solicitar acesso');
    }
  };

  const handleAceitarSolicitacao = async (solicitacaoId: string) => {
    if (!partida) return;

    try {
      await api.post(`/partidas/${matchId}/solicitacoes/${solicitacaoId}/aceitar`);
      const solicitacaoAceita = partida.solicitacoes?.find(req => req.id === solicitacaoId);
      if (solicitacaoAceita) {
        setPartida(prev => {
          if (!prev) return null;
          return {
            ...prev,
            solicitacoes: prev.solicitacoes?.filter(req => req.id !== solicitacaoId) || [],
            participantes: [
              ...(prev.participantes || []),
              {
                id: solicitacaoAceita.userId,
                nome: solicitacaoAceita.nome,
                avatar: solicitacaoAceita.avatar,
              },
            ],
            participantesConfirmados: (prev.participantesConfirmados || 0) + 1,
          };
        });
        toast.success(`Solicitação de ${solicitacaoAceita.nome} aceita com sucesso!`);
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao aceitar solicitação');
    }
  };

  const handleRecusarSolicitacao = async (solicitacaoId: string) => {
    if (!partida) return;

    try {
      await api.post(`/partidas/${matchId}/solicitacoes/${solicitacaoId}/recusar`);
      setPartida(prev => {
        if (!prev) return null;
        return {
          ...prev,
          solicitacoes: prev.solicitacoes?.filter(req => req.id !== solicitacaoId) || [],
        };
      });
      toast.success('Solicitação recusada com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao recusar solicitação');
    }
  };

  const handleSortearTimes = async (numTimes: number) => {
    if (!partida) return;

    try {
      const response = await api.post<Time[]>(`/partidas/${matchId}/sortear-times`, { numTimes });
      setPartida(prev => {
        if (!prev) return null;
        return {
          ...prev,
          times: response.data,
        };
      });
      toast.success('Times sorteados com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao sortear times');
    }
  };

  const handleCancelarPartida = async () => {
    if (!partida) return;

    try {
      await api.delete(`/partidas/${matchId}`);
      toast.success('Partida cancelada com sucesso!');
      navigate('/home');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cancelar partida');
    }
  };

  return {
    partida,
    loading,
    error,
    handleConfirmarPresenca,
    handleCancelarPresenca,
    handleSolicitarAcesso,
    handleAceitarSolicitacao,
    handleRecusarSolicitacao,
    handleSortearTimes,
    handleCancelarPartida,
    formatarDataHora,
    handleBack,
    handleOpenSortModal,
    handleCloseSortModal,
    handleCreatorMenuClick,
    handleCreatorMenuClose,
    handleEditarPartida,
    handleOpenCancelDialog,
    handleCloseCancelDialog,
    handleConfirmarCancelamento,
    realizarSorteioTimes,
    setOpenSortModal,
    setLoadingSort,
    setAnchorEl,
    setOpenCancelDialog,
    setNumTimes,
    numTimes,
    loadingSort,
    anchorEl,
    openSortModal,
    openCancelDialog,
  };
}
