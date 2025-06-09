import { useAuthRepository } from '@infrastructure/http/repositories/AuthRepository';
import { useAuthStore } from '@infrastructure/stores/authStore';
import { useCallback } from 'react';

export const useAuth = () => {
  const authRepository = useAuthRepository();
  const { setUser, clearUser } = useAuthStore();

  const login = useCallback(
    async (email: string, senha: string) => {
      const response = await authRepository.login(email, senha);
      setUser(response.user);
      return response;
    },
    [authRepository, setUser],
  );

  const register = useCallback(
    async (nome: string, email: string, senha: string) => {
      const response = await authRepository.register({ nome, email, senha });
      setUser(response.user);
      return response;
    },
    [authRepository, setUser],
  );

  const logout = useCallback(async () => {
    await authRepository.logout();
    clearUser();
  }, [authRepository, clearUser]);

  return {
    login,
    register,
    logout,
  };
};
