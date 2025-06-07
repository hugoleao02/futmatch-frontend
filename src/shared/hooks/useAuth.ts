import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
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
    logout,
  };
};
