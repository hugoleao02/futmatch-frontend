import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants/app';
import { localStorage } from '../utils/storage/LocalStorage';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.get<string>(STORAGE_KEYS.token);
    return storedToken;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [token]);

  const login = (newToken: string) => {
    localStorage.set(STORAGE_KEYS.token, newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.remove(STORAGE_KEYS.token);
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
