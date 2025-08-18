import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SUCCESS_MESSAGES } from '../constants/messages';
import { ServiceFactory } from '../services/ServiceFactory';
import { ErrorService } from '../services/errorService';
import type { IAuthActions, IAuthState, LoginRequest, RegisterRequest } from '../types';

interface AuthStore extends IAuthState, IAuthActions {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => {
      const authService = ServiceFactory.getInstance().getAuthService();

      return {
        // Estado inicial
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,

        // Ações
        setLoading: (loading: boolean) => set({ loading }),

        clearAuth: () =>
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          }),

        login: async (data: LoginRequest) => {
          set({ loading: true });
          try {
            const response = await authService.login(data);

            set({
              user: {
                id: response.id,
                nome: response.nome,
                email: response.email,
              },
              token: response.token,
              isAuthenticated: true,
              loading: false,
            });

            // Mostrar mensagem de sucesso
            console.log(SUCCESS_MESSAGES.LOGIN);
          } catch (error) {
            set({ loading: false });

            // Classificar o erro para logging
            const errorInfo = ErrorService.classifyError(error);
            console.error('Erro no login:', errorInfo);

            throw error;
          }
        },

        register: async (data: RegisterRequest) => {
          set({ loading: true });
          try {
            const response = await authService.register(data);

            set({
              user: {
                id: response.id,
                nome: response.nome,
                email: response.email,
              },
              token: response.token,
              isAuthenticated: true,
              loading: false,
            });

            // Mostrar mensagem de sucesso
            console.log(SUCCESS_MESSAGES.REGISTER);
          } catch (error) {
            set({ loading: false });

            // Classificar o erro para logging
            const errorInfo = ErrorService.classifyError(error);
            console.error('Erro no registro:', errorInfo);

            throw error;
          }
        },

        logout: () => {
          // Chamar o serviço de logout se necessário
          authService.logout();

          // Limpar o estado
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });

          // Mostrar mensagem de sucesso
          console.log(SUCCESS_MESSAGES.LOGOUT);
        },
      };
    },
    { name: 'auth-storage' },
  ),
);
