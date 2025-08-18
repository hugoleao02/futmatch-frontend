import { useEffect } from 'react';
import { useAuthStore } from '../stores';

export const useAuth = () => {
  const { user, token, isAuthenticated, loading, login, register, logout, setLoading } =
    useAuthStore();

  // Verificar token na inicialização
  useEffect(() => {
    const initializeAuth = async () => {
      if (token && user) {
        // Token existe, verificar se ainda é válido
        setLoading(true);
        try {
          // Aqui você pode adicionar uma chamada para validar o token
          // Por enquanto, vamos assumir que se existe, é válido
          setLoading(false);
        } catch (error) {
          // Token inválido, limpar estado
          logout();
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token, user, setLoading, logout]);

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
