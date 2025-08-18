import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SUCCESS_MESSAGES } from '../constants/messages';
import { FabricaServicos } from '../services/ServiceFactory';
import { ErrorService } from '../services/errorService';
import type {
  IAcoesAutenticacao,
  IEstadoAutenticacao,
  LoginRequest,
  RegisterRequest,
} from '../types';
import { OperacoesAutenticacao } from '../utils/authOperations';
import { criarEstadoAuthVazio } from '../utils/authTransformers';

interface AuthStore extends IEstadoAutenticacao, IAcoesAutenticacao {
  fazerLogin: (dados: LoginRequest) => Promise<void>;
  fazerRegistro: (dados: RegisterRequest) => Promise<void>;
  fazerLogout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => {
      const servicoAuth = FabricaServicos.getInstance().getServicoAuth();

      return {
        // Estado inicial
        usuario: null,
        token: null,
        estaAutenticado: false,
        carregando: false,

        // Ações
        definirCarregando: (carregando: boolean) => set({ carregando }),

        limparAutenticacao: () => set(criarEstadoAuthVazio()),

        fazerLogin: async (dados: LoginRequest) => {
          const authOps = new OperacoesAutenticacao(servicoAuth);
          try {
            const response = await authOps.executarLogin(dados, (carregando: boolean) =>
              set({ carregando }),
            );
            set(authOps.criarEstadoAuthDeResposta(response));

            // Mostrar mensagem de sucesso
            console.log(SUCCESS_MESSAGES.LOGIN);
          } catch (error) {
            // Classificar o erro para logging
            const errorInfo = ErrorService.classifyError(error);
            console.error('Erro no login:', errorInfo);

            throw error;
          }
        },

        fazerRegistro: async (dados: RegisterRequest) => {
          const authOps = new OperacoesAutenticacao(servicoAuth);
          try {
            const response = await authOps.executarRegistro(dados, (carregando: boolean) =>
              set({ carregando }),
            );
            set(authOps.criarEstadoAuthDeResposta(response));

            // Mostrar mensagem de sucesso
            console.log(SUCCESS_MESSAGES.REGISTER);
          } catch (error) {
            // Classificar o erro para logging
            const errorInfo = ErrorService.classifyError(error);
            console.error('Erro no registro:', errorInfo);

            throw error;
          }
        },

        fazerLogout: () => {
          // Chamar o serviço de logout se necessário
          servicoAuth.fazerLogout();

          // Limpar o estado
          set(criarEstadoAuthVazio());

          // Mostrar mensagem de sucesso
          console.log(SUCCESS_MESSAGES.LOGOUT);
        },
      };
    },
    { name: 'auth-storage' },
  ),
);
