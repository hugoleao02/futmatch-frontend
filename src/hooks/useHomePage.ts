import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuthNew';
import { useErrorHandler } from './useErrorHandler';
import { useNavigation } from './useNavigation';
import { useParticipacao } from './useParticipacao';
import { usePartidas } from './usePartidas';
import { useRetry } from './useRetry';

export const useHomePage = () => {
  const { user } = useAuth();
  const { partidas, loading, listarPartidasFuturas } = usePartidas();
  const { participarPartida } = useParticipacao();
  const { navigateToCreateMatch, handleLogout } = useNavigation();
  const { handleError } = useErrorHandler();
  const { executeWithRetry } = useRetry({ maxAttempts: 2, delayMs: 1000 });
  const [page, setPage] = useState(0);

  const carregarPartidas = useCallback(async () => {
    try {
      await executeWithRetry(() => listarPartidasFuturas(page, 10), 'Carregar partidas');
    } catch (error) {
      handleError(error, 'Carregar partidas');
    }
  }, [listarPartidasFuturas, page, handleError, executeWithRetry]);

  useEffect(() => {
    carregarPartidas();
  }, [carregarPartidas]);

  const handleParticipar = async (partidaId: number) => {
    try {
      await participarPartida(partidaId);
      carregarPartidas();
    } catch (error) {
      handleError(error, 'Participar da partida');
    }
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
