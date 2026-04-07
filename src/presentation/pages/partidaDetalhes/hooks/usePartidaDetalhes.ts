import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { PartidaDetalhesResponse } from '../../../../domain/dtos';
import { useContainer } from '../../../../infra/di/useContainer';

export function usePartidaDetalhes() {
  const { repositories } = useContainer();
  const { id } = useParams<{ id: string }>();
  const matchId = Number(id);

  const [partida, setPartida] = useState<PartidaDetalhesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDetalhes = useCallback(async () => {
    if (!matchId || Number.isNaN(matchId)) {
      setError('ID da partida invalido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const detalhes = await repositories.partidaRepository.buscarDetalhesPartida(matchId);
      setPartida(detalhes);
    } catch {
      const message = 'Erro ao carregar detalhes da partida';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [matchId, repositories.partidaRepository]);

  useEffect(() => {
    carregarDetalhes();
  }, [carregarDetalhes]);

  return { partida, loading, error, refresh: carregarDetalhes };
}
