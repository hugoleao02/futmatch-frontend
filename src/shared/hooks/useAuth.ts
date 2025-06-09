import { AuthService } from '@infrastructure/services/AuthService';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants/app';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [token, setToken] = useLocalStorage<string | null>(STORAGE_KEYS.token, null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authService = new AuthService();

  useEffect(() => {
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [token]);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials);
    setToken(response.token);
    setIsAuthenticated(true);
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    const response = await authService.register(userData);
    setToken(response.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    token,
    login,
    register,
    logout,
  };
};
