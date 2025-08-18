import { useEffect } from 'react';
import { useAuthStore } from '../stores';
import { useServiceOperations } from './useServiceOperations';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, register, logout } = useAuthStore();
  const { executeOperationGeneric, loading } = useServiceOperations();

  // Verificar token na inicialização
  useEffect(() => {
    const initializeAuth = async () => {
      if (token && user) {
        // Token existe, verificar se ainda é válido
        await executeOperationGeneric(async () => {
          // Aqui você pode adicionar uma chamada para validar o token
          // Por enquanto, vamos assumir que se existe, é válido
        }, 'Validar token');
      }
    };

    initializeAuth();
  }, [token, user, executeOperationGeneric]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
};
