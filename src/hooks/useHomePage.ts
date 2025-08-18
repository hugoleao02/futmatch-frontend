import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuthNew';
import { useNavigation } from './useNavigation';
import { useParticipacao } from './useParticipacao';
import { usePartidas } from './usePartidas';
import { useServiceOperations } from './useServiceOperations';

export const useHomePage = () => {
  const { user } = useAuth();
  const { partidas, listarPartidasFuturas } = usePartidas();
  const { participarPartida } = useParticipacao();
  const { navigateToCreateMatch, handleLogout } = useNavigation();
  const { executeOperationGeneric, loading } = useServiceOperations();
  const [page, setPage] = useState(0);

  const carregarPartidas = useCallback(async () => {
    await executeOperationGeneric(() => listarPartidasFuturas(page, 10), 'Carregar partidas');
  }, [listarPartidasFuturas, page, executeOperationGeneric]);

  useEffect(() => {
    carregarPartidas();
  }, [carregarPartidas]);

  const handleParticipar = async (partidaId: number) => {
    await executeOperationGeneric(async () => {
      await participarPartida(partidaId);
      carregarPartidas();
    }, 'Participar da partida');
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
