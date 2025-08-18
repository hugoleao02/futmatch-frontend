import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import type { Partida } from '../types';
import { useOperations } from './useOperations';

export const useHomePage = () => {
  const navegar = useNavigate();
  const [partidas, definirPartidas] = useState<Partida[]>([]);
  const { executarOperacaoGenerica, loading } = useOperations<Partida[]>();

  const lidarComVerPartidas = useCallback(() => {
    navegar(ROUTES.MATCH.CREATE); // Usar rota existente
  }, [navegar]);

  const lidarComCriarPartida = useCallback(() => {
    navegar(ROUTES.MATCH.CREATE);
  }, [navegar]);

  const lidarComParticipar = useCallback(() => {
    navegar(ROUTES.MATCH.CREATE); // Usar rota existente
  }, [navegar]);

  // Carregar partidas na inicialização
  useEffect(() => {
    const carregarPartidas = async () => {
      try {
        // Aqui você pode carregar as partidas da API
        // Por enquanto, vamos usar dados mock
        const partidasMock: Partida[] = [];
        definirPartidas(partidasMock);
      } catch (erro) {
        console.error('Erro ao carregar partidas:', erro);
      }
    };

    carregarPartidas();
  }, []);

  return {
    partidas,
    carregando: loading,
    lidarComVerPartidas,
    lidarComCriarPartida,
    lidarComParticipar,
  };
};
