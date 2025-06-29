import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { partidaService } from '../services/api';
import type { Partida, PartidaRequest, PartidaUpdateRequest } from '../types';

export const usePartidas = () => {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(false);

  const listarPartidas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await partidaService.listarPartidas();
      setPartidas(data);
      return data;
    } catch (error: unknown) {
      toast.error('Erro ao carregar partidas');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const listarPartidasFuturas = useCallback(async (page = 0, size = 10) => {
    try {
      setLoading(true);
      const data = await partidaService.listarPartidasFuturas(page, size);
      setPartidas(data.content);
      return data;
    } catch (error: unknown) {
      toast.error('Erro ao carregar partidas futuras');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarPartidaPorId = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const data = await partidaService.buscarPartidaPorId(id);
      return data;
    } catch (error: unknown) {
      toast.error('Erro ao carregar detalhes da partida');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const criarPartida = useCallback(async (data: PartidaRequest) => {
    try {
      setLoading(true);
      const novaPartida = await partidaService.criarPartida(data);
      setPartidas(prev => [...prev, novaPartida]);
      toast.success('Partida criada com sucesso!');
      return novaPartida;
    } catch (error: unknown) {
      toast.error('Erro ao criar partida');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarPartida = useCallback(async (id: number, data: PartidaUpdateRequest) => {
    try {
      setLoading(true);
      const partidaAtualizada = await partidaService.atualizarPartida(id, data);
      setPartidas(prev => prev.map(p => (p.id === id ? partidaAtualizada : p)));
      toast.success('Partida atualizada com sucesso!');
      return partidaAtualizada;
    } catch (error: unknown) {
      toast.error('Erro ao atualizar partida');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletarPartida = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await partidaService.deletarPartida(id);
      setPartidas(prev => prev.filter(p => p.id !== id));
      toast.success('Partida deletada com sucesso!');
    } catch (error: unknown) {
      toast.error('Erro ao deletar partida');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

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
