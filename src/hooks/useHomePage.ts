import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from './useAuth';
import { useParticipacao } from './useParticipacao';
import { usePartidas } from './usePartidas';

export const useHomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { partidas, loading, listarPartidasFuturas } = usePartidas();
  const { participarPartida } = useParticipacao();
  const [page, setPage] = useState(0);

  const carregarPartidas = useCallback(async () => {
    try {
      await listarPartidasFuturas(page, 10);
    } catch (error) {
      // erro já tratado no hook
    }
  }, [listarPartidasFuturas, page]);

  useEffect(() => {
    carregarPartidas();
  }, [carregarPartidas]);

  const handleParticipar = async (partidaId: number) => {
    try {
      await participarPartida(partidaId);
      carregarPartidas();
    } catch (error) {}
  };

  const handleCriarPartida = () => {
    navigate(ROUTES.MATCH.CREATE);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return {
    user,
    partidas,
    loading,
    page,
    setPage,
    handleParticipar,
    handleCriarPartida,
    handleLogout,
  };
};
