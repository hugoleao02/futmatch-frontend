import { useCallback, useState } from 'react';
import type { SearchFilters } from '../../core/usecases/interfaces/IHomeUseCase';

export const useFilters = (initialFilters: SearchFilters) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some(value => value && value !== 'Todos');
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
};
