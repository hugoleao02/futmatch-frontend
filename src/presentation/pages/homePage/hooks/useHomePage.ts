import { useCallback, useMemo, useReducer } from 'react';
import type { PartidaResponse } from '../../../../domain/dtos';
import type { SearchFilters } from '../../../../domain/usecases/interfaces/IHomeUseCase';
import { useContainer } from '../../../../infra/di/useContainer';
import { useFilters } from '../../../../shared/hooks';
import { useErrorHandler } from '../../../../shared/hooks';
import { useLoading } from '../../../../shared/hooks';

const INITIAL_FILTERS: SearchFilters = {
  location: '',
  sport: 'Todos',
  date: '',
  time: '',
  matchType: 'Todos',
};

interface HomeState {
  matches: PartidaResponse[];
  showMap: boolean;
  error: string | null;
}

type HomeAction =
  | { type: 'SET_MATCHES'; payload: PartidaResponse[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_MAP' };

const initialState: HomeState = {
  matches: [],
  showMap: false,
  error: null,
};

const homeReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'SET_MATCHES':
      return { ...state, matches: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_MAP':
      return { ...state, showMap: !state.showMap };
    default:
      return state;
  }
};

export const useHome = () => {
  const { useCases } = useContainer();
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters(INITIAL_FILTERS);
  const { handleError } = useErrorHandler();
  const { isLoading, withLoading } = useLoading();

  const loadData = useCallback(async () => {
    await withLoading(async () => {
      try {
        const matchesData = await useCases.homeUseCase.getPartidas();
        dispatch({ type: 'SET_MATCHES', payload: matchesData });
      } catch (error) {
        handleError(error, 'Erro ao carregar dados');
        dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar dados' });
      }
    });
  }, [useCases.homeUseCase, withLoading, handleError]);

  const searchMatches = useCallback(async () => {
    await withLoading(async () => {
      try {
        const filteredMatches = await useCases.homeUseCase.getPartidas(filters);
        dispatch({ type: 'SET_MATCHES', payload: filteredMatches });
      } catch (error) {
        handleError(error, 'Erro ao buscar partidas');
        dispatch({ type: 'SET_ERROR', payload: 'Erro ao buscar partidas' });
      }
    });
  }, [useCases.homeUseCase, filters, withLoading, handleError]);

  const generateRecap = useCallback(
    async (matchName: string, details: string): Promise<string> => {
      try {
        return await useCases.homeUseCase.generateMatchRecap(matchName, details);
      } catch (error) {
        handleError(error, 'Erro ao gerar resumo');
        throw error;
      }
    },
    [useCases.homeUseCase, handleError],
  );

  const toggleMapView = useCallback(() => {
    dispatch({ type: 'TOGGLE_MAP' });
  }, []);

  const availableMatches = useMemo(() => {
    return state.matches;
  }, [state.matches]);

  return {
    // Estado
    matches: state.matches,
    loading: isLoading,
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
