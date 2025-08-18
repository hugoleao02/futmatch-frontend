import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { STORAGE_KEYS } from '../constants';
import { authService } from '../services/api';
import type { LoginRequest, RegisterRequest, User } from '../types';
import { handleApiError } from '../utils';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken, removeToken] = useLocalStorage<string | null>(STORAGE_KEYS.TOKEN, null);
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage<User | null>(
    STORAGE_KEYS.USER,
    null,
  );

  useEffect(() => {
    if (token && storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [token, storedUser]);

  const createUserFromResponse = useCallback(
    (response: any): User => ({
      id: response.id,
      nome: response.nome,
      email: response.email,
    }),
    [],
  );

  const handleAuthSuccess = useCallback(
    (response: any) => {
      const userData = createUserFromResponse(response);
      setToken(response.token);
      setStoredUser(userData);
      setUser(userData);
    },
    [createUserFromResponse, setToken, setStoredUser],
  );

  const login = useCallback(
    async (data: LoginRequest) => {
      try {
        setLoading(true);
        const response = await authService.login(data);
        handleAuthSuccess(response);
        toast.success('Login realizado com sucesso!');
        return response;
      } catch (error: unknown) {
        handleApiError(error, 'fazer login');
      } finally {
        setLoading(false);
      }
    },
    [handleAuthSuccess],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        setLoading(true);
        const response = await authService.register(data);
        handleAuthSuccess(response);
        toast.success('Cadastro realizado com sucesso!');
        return response;
      } catch (error: unknown) {
        handleApiError(error, 'fazer cadastro');
      } finally {
        setLoading(false);
      }
    },
    [handleAuthSuccess],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    removeToken();
    removeStoredUser();
    toast.success('Logout realizado com sucesso!');
  }, [removeToken, removeStoredUser]);

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };
};
