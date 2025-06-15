import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import type { Partida } from '../../../../domain/entities/Partida';
import type { Sala } from '../../../../domain/entities/Sala';
import type { SearchFilters } from '../../../../domain/usecases/interfaces/IHomeUseCase';
import { useContainer } from '../../../../infra/di/useContainer';
import { useFilters } from '../../../../shared/hooks';

const INITIAL_FILTERS: SearchFilters = {
  location: '',
  sport: 'Todos',
  date: '',
  time: '',
  matchType: 'Todos',
};

interface HomeState {
  matches: Partida[];
  rooms: Sala[];
  loading: boolean;
  showMap: boolean;
  error: string | null;
}

type HomeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_MATCHES'; payload: Partida[] }
  | { type: 'SET_ROOMS'; payload: Sala[] }
  | { type: 'TOGGLE_MAP' }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: HomeState = {
  matches: [],
  rooms: [],
  loading: true,
  showMap: false,
  error: null,
};

const homeReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_MATCHES':
      return { ...state, matches: action.payload, error: null };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload, error: null };
    case 'TOGGLE_MAP':
      return { ...state, showMap: !state.showMap };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const useHome = () => {
  const { useCases } = useContainer();
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters(INITIAL_FILTERS);

  const loadData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const [matchesData, roomsData] = await Promise.all([
        useCases.homeUseCase.getMatches(),
        useCases.homeUseCase.getUserRooms(),
      ]);
      dispatch({ type: 'SET_MATCHES', payload: matchesData });
      dispatch({ type: 'SET_ROOMS', payload: roomsData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar dados';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [useCases.homeUseCase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const searchMatches = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const filteredMatches = await useCases.homeUseCase.getMatches(filters);
      dispatch({ type: 'SET_MATCHES', payload: filteredMatches });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar partidas';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [useCases.homeUseCase, filters]);

  const generateRecap = useCallback(
    async (matchName: string, details: string): Promise<string> => {
      try {
        return await useCases.homeUseCase.generateMatchRecap(matchName, details);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao gerar resumo';
        toast.error(errorMessage);
        throw error;
      }
    },
    [useCases.homeUseCase],
  );

  const toggleMapView = useCallback(() => {
    dispatch({ type: 'TOGGLE_MAP' });
  }, []);

  const availableMatches = useMemo(() => {
    return state.matches.filter(match => !match.isRoomMatch);
  }, [state.matches]);

  return {
    // Estado
    matches: state.matches,
    rooms: state.rooms,
    loading: state.loading,
    showMap: state.showMap,
    error: state.error,
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
