import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Match, Room, SearchFilters } from '../../../../core/usecases/interfaces/IHomeUseCase';
import { useContainer } from '../../../../infra/di/useContainer';
import { useFilters } from '../../../../shared/hooks';

const INITIAL_FILTERS: SearchFilters = {
  location: '',
  sport: 'Todos',
  date: '',
  time: '',
  matchType: 'Todos',
};

export const useHome = () => {
  const { useCases } = useContainer();
  const [matches, setMatches] = useState<Match[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  // Usando o hook personalizado para filtros
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters(INITIAL_FILTERS);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [matchesData, roomsData] = await Promise.all([
        useCases.homeUseCase.getMatches(),
        useCases.homeUseCase.getUserRooms(),
      ]);
      setMatches(matchesData);
      setRooms(roomsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [useCases.homeUseCase]);

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, [loadData]);

  const searchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const filteredMatches = await useCases.homeUseCase.getMatches(filters);
      setMatches(filteredMatches);
    } catch (error) {
      console.error('Erro ao buscar partidas:', error);
    } finally {
      setLoading(false);
    }
  }, [useCases.homeUseCase, filters]);

  const generateRecap = useCallback(
    async (matchName: string, details: string): Promise<string> => {
      return await useCases.homeUseCase.generateMatchRecap(matchName, details);
    },
    [useCases.homeUseCase],
  );

  const toggleMapView = useCallback(() => {
    setShowMap(prev => !prev);
  }, []);

  // Memoizar partidas disponíveis para evitar recálculos desnecessários
  const availableMatches = useMemo(() => {
    return matches.filter(match => !match.isRoomMatch);
  }, [matches]);

  return {
    // Estado
    matches,
    rooms,
    loading,
    showMap,
    filters,

    // Ações
    searchMatches,
    generateRecap,
    updateFilter,
    resetFilters,
    toggleMapView,
    loadData,

    // Computed
    availableMatches,
    hasActiveFilters: hasActiveFilters(),
  };
};
