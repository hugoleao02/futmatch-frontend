import { useCallback, useState } from 'react';
import { SUCCESS_MESSAGES } from '../constants/messages';
import { partidaService } from '../services/api';
import type { Partida, PartidaRequest, PartidaUpdateRequest } from '../types';
import { useAsyncOperation } from './useAsyncOperation';

export const usePartidas = () => {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const { executeOperationWithoutParams, loading } = useAsyncOperation();

  const listarPartidas = useCallback(async () => {
    const data = (await executeOperationWithoutParams(
      partidaService.listarPartidas,
      undefined,
      'Carregar partidas',
    )) as Partida[];
    setPartidas(data);
    return data;
  }, [executeOperationWithoutParams]);

  const listarPartidasFuturas = useCallback(
    async (page = 0, size = 10) => {
      const data = (await executeOperationWithoutParams(
        () => partidaService.listarPartidasFuturas(page, size),
        undefined,
        'Carregar partidas futuras',
      )) as any;
      setPartidas(data.content);
      return data;
    },
    [executeOperationWithoutParams],
  );

  const buscarPartidaPorId = useCallback(
    async (id: number) => {
      return executeOperationWithoutParams(
        () => partidaService.buscarPartidaPorId(id),
        undefined,
        'Carregar detalhes da partida',
      );
    },
    [executeOperationWithoutParams],
  );

  const criarPartida = useCallback(
    async (data: PartidaRequest) => {
      const novaPartida = (await executeOperationWithoutParams(
        () => partidaService.criarPartida(data),
        SUCCESS_MESSAGES.PARTIDA_CREATED,
        'Criar partida',
      )) as Partida;
      setPartidas(prev => [...prev, novaPartida]);
      return novaPartida;
    },
    [executeOperationWithoutParams],
  );

  const atualizarPartida = useCallback(
    async (id: number, data: PartidaUpdateRequest) => {
      const partidaAtualizada = (await executeOperationWithoutParams(
        () => partidaService.atualizarPartida(id, data),
        SUCCESS_MESSAGES.PARTIDA_UPDATED,
        'Atualizar partida',
      )) as Partida;
      setPartidas(prev => prev.map(p => (p.id === id ? partidaAtualizada : p)));
      return partidaAtualizada;
    },
    [executeOperationWithoutParams],
  );

  const deletarPartida = useCallback(
    async (id: number) => {
      await executeOperationWithoutParams(
        () => partidaService.deletarPartida(id),
        SUCCESS_MESSAGES.PARTIDA_DELETED,
        'Deletar partida',
      );
      setPartidas(prev => prev.filter(p => p.id !== id));
    },
    [executeOperationWithoutParams],
  );

  return {
    partidas,
    loading,
    listarPartidas,
    listarPartidasFuturas,
    buscarPartidaPorId,
    criarPartida,
    atualizarPartida,
    deletarPartida,
  };
};
