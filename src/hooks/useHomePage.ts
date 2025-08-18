import { useCallback, useEffect, useState } from 'react';
import { useAsyncOperation } from './useAsyncOperation';
import { useAuth } from './useAuthNew';
import { useNavigation } from './useNavigation';
import { useParticipacao } from './useParticipacao';
import { usePartidas } from './usePartidas';

export const useHomePage = () => {
  const { user } = useAuth();
  const { partidas, listarPartidasFuturas } = usePartidas();
  const { participarPartida } = useParticipacao();
  const { navigateToCreateMatch, handleLogout } = useNavigation();
  const { executeOperationWithoutParams, loading } = useAsyncOperation();
  const [page, setPage] = useState(0);

  const carregarPartidas = useCallback(async () => {
    await executeOperationWithoutParams(
      () => listarPartidasFuturas(page, 10),
      undefined,
      'Carregar partidas',
    );
  }, [listarPartidasFuturas, page, executeOperationWithoutParams]);

  useEffect(() => {
    carregarPartidas();
  }, [carregarPartidas]);

  const handleParticipar = async (partidaId: number) => {
    await executeOperationWithoutParams(
      async () => {
        await participarPartida(partidaId);
        carregarPartidas();
      },
      undefined,
      'Participar da partida',
    );
  };

  return {
    user,
    partidas,
    loading,
    page,
    setPage,
    handleParticipar,
    handleCriarPartida: navigateToCreateMatch,
    handleLogout,
  };
};
