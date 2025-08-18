import { useEffect } from 'react';
import { useAuthStore } from '../stores';
import { useOperations } from './useOperations';

export const useAutenticacao = () => {
  const { usuario, token, estaAutenticado, fazerLogin, fazerRegistro, fazerLogout } =
    useAuthStore();
  const { executarOperacaoGenerica, loading } = useOperations();

  // Verificar token na inicialização
  useEffect(() => {
    const inicializarAutenticacao = async () => {
      if (token && usuario) {
        // Token existe, verificar se ainda é válido
        await executarOperacaoGenerica(async () => {
          // Aqui você pode adicionar uma chamada para validar o token
          // Por enquanto, vamos assumir que se existe, é válido
        }, 'Validar token');
      }
    };

    inicializarAutenticacao();
  }, [token, usuario, executarOperacaoGenerica]);

  return {
    usuario,
    token,
    estaAutenticado,
    loading,
    fazerLogin,
    fazerRegistro,
    fazerLogout,
  };
};
