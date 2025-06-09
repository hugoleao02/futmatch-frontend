import { HomeUseCase } from '@application/usecases/home/HomeUseCase';
import type { Match } from '@application/usecases/home/interfaces/IHomeUseCase';
import { PartidaRepository } from '@infrastructure/http/repositories/PartidaRepository';
import { useCallback, useEffect, useState } from 'react';

export function useHome() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const partidaRepository = new PartidaRepository();
  const homeUseCase = new HomeUseCase(partidaRepository);

  const loadMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await homeUseCase.getMatches();
      setMatches(data);
    } catch (err) {
      setError('Erro ao carregar partidas. Tente novamente mais tarde.');
      console.error('Erro ao carregar partidas:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return {
    matches,
    isLoading,
    error,
    refresh: loadMatches,
  };
}
