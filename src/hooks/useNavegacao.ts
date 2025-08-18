import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuthStore } from '../stores/authStore';

export const useNavegacao = () => {
  const navegar = useNavigate();
  const { fazerLogout } = useAuthStore();

  const navegarParaHome = useCallback(() => {
    navegar(ROUTES.HOME);
  }, [navegar]);

  const navegarParaLogin = useCallback(() => {
    navegar(ROUTES.LOGIN);
  }, [navegar]);

  const navegarParaRegistro = useCallback(() => {
    navegar(ROUTES.REGISTER);
  }, [navegar]);

  const navegarParaCriarPartida = useCallback(() => {
    navegar(ROUTES.MATCH.CREATE);
  }, [navegar]);

  const navegarParaDetalhesPartida = useCallback(
    (id: number) => {
      navegar(ROUTES.MATCH.DETAILS.replace(':id', id.toString()));
    },
    [navegar],
  );

  const lidarComLogout = useCallback(() => {
    fazerLogout();
    navegarParaLogin();
  }, [fazerLogout, navegarParaLogin]);

  return {
    navegarParaHome,
    navegarParaLogin,
    navegarParaRegistro,
    navegarParaCriarPartida,
    navegarParaDetalhesPartida,
    lidarComLogout,
  };
};
