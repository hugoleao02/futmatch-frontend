import { useCallback } from 'react';
import { ServiceFactory } from '../services/ServiceFactory';
import type { PagePartidaResponse, Partida, PartidaRequest, PartidaUpdateRequest } from '../types';
import { useServiceOperations } from './useServiceOperations';

export const usePartidas = () => {
  const {
    data: partidas,
    loading,
    executeOperation,
    executeOperationGeneric,
    addItem,
    updateItem,
    removeItem,
    setDataList,
  } = useServiceOperations<Partida>();

  const partidaService = ServiceFactory.getInstance().getPartidaService();

  const listarPartidas = useCallback(async () => {
    const data = await executeOperationGeneric<Partida[]>(
      partidaService.listarPartidas,
      'Carregar partidas',
    );
    setDataList(data);
    return data;
  }, [executeOperationGeneric, setDataList]);

  const listarPartidasFuturas = useCallback(
    async (page = 0, size = 10) => {
      const data = await executeOperationGeneric<PagePartidaResponse>(
        () => partidaService.listarPartidasFuturas(page, size),
        'Carregar partidas futuras',
      );
      setDataList(data.content);
      return data;
    },
    [executeOperationGeneric, setDataList],
  );

  const buscarPartidaPorId = useCallback(
    async (id: number) => {
      return executeOperation(
        () => partidaService.buscarPartidaPorId(id),
        'Carregar detalhes da partida',
      );
    },
    [executeOperation],
  );

  const criarPartida = useCallback(
    async (data: PartidaRequest) => {
      const novaPartida = await executeOperation(
        () => partidaService.criarPartida(data),
        'Criar partida',
      );
      addItem(novaPartida);
      return novaPartida;
    },
    [executeOperation, addItem],
  );

  const atualizarPartida = useCallback(
    async (id: number, data: PartidaUpdateRequest) => {
      const partidaAtualizada = await executeOperation(
        () => partidaService.atualizarPartida(id, data),
        'Atualizar partida',
      );
      updateItem(id, () => partidaAtualizada);
      return partidaAtualizada;
    },
    [executeOperation, updateItem],
  );

  const deletarPartida = useCallback(
    async (id: number) => {
      await executeOperationGeneric<void>(
        () => partidaService.deletarPartida(id),
        'Deletar partida',
      );
      removeItem(id);
    },
    [executeOperationGeneric, removeItem],
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
    setPartidas: setDataList,
  };
};
