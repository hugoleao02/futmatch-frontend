import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../services/api';
import type { LoginRequest, RegisterRequest, User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (_error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setLoading(true);
      const response = (await authService.login(data)) as any;

      // Criar objeto user a partir da resposta da API
      const user: User = {
        id: response.id,
        nome: response.nome,
        email: response.email,
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Login realizado com sucesso!');
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setLoading(true);
      const response = (await authService.register(data)) as any;

      // Criar objeto user a partir da resposta da API
      const user: User = {
        id: response.id,
        nome: response.nome,
        email: response.email,
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Cadastro realizado com sucesso!');
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer cadastro';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    toast.success('Logout realizado com sucesso!');
  }, []);

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
