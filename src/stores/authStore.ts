import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { authService } from '../services/api';
import type { LoginRequest, RegisterRequest, User } from '../types';
import { ErrorService } from '../services/errorService';

interface AuthState {
  // Estado
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  // Ações
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      // Ações
      setLoading: (loading: boolean) => set({ loading }),

      login: async (data: LoginRequest) => {
        try {
          set({ loading: true });
          const response = await authService.login(data);
          
          const userData: User = {
            id: response.id,
            nome: response.nome,
            email: response.email,
          };

          set({
            user: userData,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });

          toast.success('Login realizado com sucesso!');
        } catch (error: unknown) {
          set({ loading: false });
          const errorInfo = ErrorService.classifyError(error);
          // O erro será tratado pelo componente que chama este método
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ loading: true });
          const response = await authService.register(data);
          
          const userData: User = {
            id: response.id,
            nome: response.nome,
            email: response.email,
          };

          set({
            user: userData,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });

          toast.success('Cadastro realizado com sucesso!');
        } catch (error: unknown) {
          set({ loading: false });
          const errorInfo = ErrorService.classifyError(error);
          // O erro será tratado pelo componente que chama este método
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        get().clearAuth();
        toast.success('Logout realizado com sucesso!');
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
