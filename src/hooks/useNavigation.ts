import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuthStore } from '../stores/authStore';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const navigateToHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const navigateToLogin = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const navigateToRegister = useCallback(() => {
    navigate(ROUTES.REGISTER);
  }, [navigate]);

  const navigateToCreateMatch = useCallback(() => {
    navigate(ROUTES.MATCH.CREATE);
  }, [navigate]);

  const navigateToMatchDetails = useCallback((id: number) => {
    navigate(ROUTES.MATCH.DETAILS.replace(':id', id.toString()));
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigateToLogin();
  }, [logout, navigateToLogin]);

  return {
    navigateToHome,
    navigateToLogin,
    navigateToRegister,
    navigateToCreateMatch,
    navigateToMatchDetails,
    handleLogout,
  };
};
