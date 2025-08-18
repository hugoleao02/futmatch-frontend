import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SUCCESS_MESSAGES } from '../constants/messages';
import { ServiceFactory } from '../services/ServiceFactory';
import { ErrorService } from '../services/errorService';
import type { IAuthActions, IAuthState, LoginRequest, RegisterRequest } from '../types';
import { AuthOperations } from '../utils/authOperations';
import { createEmptyAuthState } from '../utils/authTransformers';

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

        clearAuth: () => set(createEmptyAuthState()),

        login: async (data: LoginRequest) => {
          const authOps = new AuthOperations(authService);
          try {
            const response = await authOps.executeLogin(data, loading => set({ loading }));
            set(authOps.createAuthStateFromResponse(response));

            // Mostrar mensagem de sucesso
            console.log(SUCCESS_MESSAGES.LOGIN);
          } catch (error) {
            // Classificar o erro para logging
            const errorInfo = ErrorService.classifyError(error);
            console.error('Erro no login:', errorInfo);

            throw error;
          }
        },

        register: async (data: RegisterRequest) => {
          const authOps = new AuthOperations(authService);
          try {
            const response = await authOps.executeRegister(data, loading => set({ loading }));
            set(authOps.createAuthStateFromResponse(response));

            // Mostrar mensagem de sucesso
            console.log(SUCCESS_MESSAGES.REGISTER);
          } catch (error) {
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
          set(createEmptyAuthState());

          // Mostrar mensagem de sucesso
          console.log(SUCCESS_MESSAGES.LOGOUT);
        },
      };
    },
    { name: 'auth-storage' },
  ),
);
