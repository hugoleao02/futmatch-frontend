import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export interface ConfiguracaoRoteamento {
  rotaPadrao?: string;
  rotaAutenticada?: string;
  rotaPublica?: string;
}

/**
 * Hook para gerenciar lógica de roteamento
 * Responsabilidade única: Gerenciar navegação e proteção de rotas
 */
export const useRoteamento = (configuracao: ConfiguracaoRoteamento = {}) => {
  const navegar = useNavigate();
  const { estaAutenticado } = useAuthStore();
  const [abaAtiva, definirAbaAtiva] = useState(0);

  const { rotaPadrao = '/', rotaAutenticada = '/home', rotaPublica = '/auth' } = configuracao;

  // Navegação baseada em autenticação
  const navegarBaseadoNaAutenticacao = useCallback(() => {
    if (estaAutenticado) {
      navegar(rotaAutenticada);
    } else {
      navegar(rotaPublica);
    }
  }, [estaAutenticado, navegar, rotaAutenticada, rotaPublica]);

  // Navegação para rota específica
  const navegarPara = useCallback(
    (rota: string) => {
      navegar(rota);
    },
    [navegar],
  );

  // Navegação para rota padrão
  const navegarParaPadrao = useCallback(() => {
    navegar(rotaPadrao);
  }, [navegar, rotaPadrao]);

  // Verificar se usuário pode acessar rota
  const podeAcessarRota = useCallback(
    (rota: string, requerAutenticacao: boolean) => {
      if (requerAutenticacao && !estaAutenticado) {
        return false;
      }
      if (!requerAutenticacao && estaAutenticado && rota === rotaPublica) {
        return false;
      }
      return true;
    },
    [estaAutenticado, rotaPublica],
  );

  // Gerenciar mudança de aba
  const lidarComMudancaDeAba = useCallback((novaAba: number) => {
    definirAbaAtiva(novaAba);
  }, []);

  return {
    // Estado
    abaAtiva,
    estaAutenticado,

    // Ações
    navegarBaseadoNaAutenticacao,
    navegarPara,
    navegarParaPadrao,
    podeAcessarRota,
    lidarComMudancaDeAba,
    definirAbaAtiva,
  };
};
