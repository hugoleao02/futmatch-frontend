import type { Partida } from '@domain/entities/Partida';
import { PartidaRepository } from '@infrastructure/repositories/PartidaRepository';
import { useState } from 'react';

export function useMatch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const partidaRepository = new PartidaRepository();

  const createMatch = async (matchData: Omit<Partida, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partidaRepository.criarPartida(matchData);
      return response;
    } catch (err) {
      setError('Erro ao criar partida. Tente novamente mais tarde.');
      console.error('Erro ao criar partida:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMatch = async (id: string, matchData: Partial<Partida>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partidaRepository.atualizarPartida(id, matchData);
      return response;
    } catch (err) {
      setError('Erro ao atualizar partida. Tente novamente mais tarde.');
      console.error('Erro ao atualizar partida:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getMatch = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partidaRepository.buscarPartidaPorId(id);
      return response;
    } catch (err) {
      setError('Erro ao buscar partida. Tente novamente mais tarde.');
      console.error('Erro ao buscar partida:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMatch = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await partidaRepository.deletarPartida(id);
    } catch (err) {
      setError('Erro ao deletar partida. Tente novamente mais tarde.');
      console.error('Erro ao deletar partida:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const participateMatch = async (id: string, userId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partidaRepository.participarPartida(id, userId);
      return response;
    } catch (err) {
      setError('Erro ao participar da partida. Tente novamente mais tarde.');
      console.error('Erro ao participar da partida:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const leaveMatch = async (id: string, userId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partidaRepository.sairPartida(id, userId);
      return response;
    } catch (err) {
      setError('Erro ao sair da partida. Tente novamente mais tarde.');
      console.error('Erro ao sair da partida:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createMatch,
    updateMatch,
    getMatch,
    deleteMatch,
    participateMatch,
    leaveMatch,
  };
}
