import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../../infra/http/api.ts';
import type { PartidaDetalhes } from '../../../../domain/entities';
import type { ApiErrorResponse } from '../../../../shared/types';

function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return typeof error === 'object' && error !== null && 'error' in error && 'status' in error;
}

function extractErrorMessage(error: unknown, fallback = 'Erro inesperado'): string {
  if (isApiErrorResponse(error)) {
    return error.error?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export function usePartidasDetalhesPageHandlers() {
  const [openSortModal, setOpenSortModal] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [numTimes, setNumTimes] = useState(2);
  const [loadingSort, setLoadingSort] = useState(false);
  const [partida, setPartida] = useState<PartidaDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: matchId = '' } = useParams<{ id: string }>();

  function formatarDataHora(dataHora: string) {
    const data = new Date(dataHora);
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  }

  function handleOpenSortModal() {
    setOpenSortModal(true);
  }

  function handleCloseSortModal() {
    setOpenSortModal(false);
  }

  function handleCreatorMenuClose() {
    setAnchorEl(null);
  }

  function handleOpenCancelDialog() {
    handleCreatorMenuClose();
    setOpenCancelDialog(true);
  }

  function handleCloseCancelDialog() {
    setOpenCancelDialog(false);
  }


  const carregarDetalhesPartida :()=> Promise<void> = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<PartidaDetalhes>(`/partidas/${matchId}`);
      setPartida(response.data);
      setError(null);
    } catch (error: unknown) {
      const message = extractErrorMessage(error, 'Erro ao carregar detalhes da partida');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    carregarDetalhesPartida().catch(() => {});
  }, [carregarDetalhesPartida]);

  return {
    partida,
    loading,
    error,
    formatarDataHora,
    handleOpenSortModal,
    handleCloseSortModal,
    handleOpenCancelDialog,
    handleCloseCancelDialog,
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
