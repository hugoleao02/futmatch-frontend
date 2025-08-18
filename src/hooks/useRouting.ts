import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export interface RoutingConfig {
  defaultRoute?: string;
  authRoute?: string;
  publicRoute?: string;
}

/**
 * Hook para gerenciar lógica de roteamento
 * Responsabilidade única: Gerenciar navegação e proteção de rotas
 */
export const useRouting = (config: RoutingConfig = {}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);

  const { defaultRoute = '/', authRoute = '/home', publicRoute = '/auth' } = config;

  // Navegação baseada em autenticação
  const navigateBasedOnAuth = useCallback(() => {
    if (isAuthenticated) {
      navigate(authRoute);
    } else {
      navigate(publicRoute);
    }
  }, [isAuthenticated, navigate, authRoute, publicRoute]);

  // Navegação para rota específica
  const navigateTo = useCallback(
    (route: string) => {
      navigate(route);
    },
    [navigate],
  );

  // Navegação para rota padrão
  const navigateToDefault = useCallback(() => {
    navigate(defaultRoute);
  }, [navigate, defaultRoute]);

  // Verificar se usuário pode acessar rota
  const canAccessRoute = useCallback(
    (route: string, requiresAuth: boolean) => {
      if (requiresAuth && !isAuthenticated) {
        return false;
      }
      if (!requiresAuth && isAuthenticated && route === publicRoute) {
        return false;
      }
      return true;
    },
    [isAuthenticated, publicRoute],
  );

  // Gerenciar mudança de aba
  const handleTabChange = useCallback((newTab: number) => {
    setActiveTab(newTab);
  }, []);

  return {
    // Estado
    activeTab,
    isAuthenticated,

    // Ações
    navigateBasedOnAuth,
    navigateTo,
    navigateToDefault,
    canAccessRoute,
    handleTabChange,
    setActiveTab,
  };
};
