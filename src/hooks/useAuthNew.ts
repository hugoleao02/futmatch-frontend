import { useEffect } from 'react';
import { useAuthStore } from '../stores';
import { useAsyncOperation } from './useAsyncOperation';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, register, logout } = useAuthStore();
  const { executeOperationWithoutParams, loading } = useAsyncOperation();

  // Verificar token na inicialização
  useEffect(() => {
    const initializeAuth = async () => {
      if (token && user) {
        // Token existe, verificar se ainda é válido
        await executeOperationWithoutParams(
          async () => {
            // Aqui você pode adicionar uma chamada para validar o token
            // Por enquanto, vamos assumir que se existe, é válido
          },
          undefined,
          'Validar token',
        );
      }
    };

    initializeAuth();
  }, [token, user, executeOperationWithoutParams]);

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
