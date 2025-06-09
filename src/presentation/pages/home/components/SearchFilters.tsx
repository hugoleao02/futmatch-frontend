import type { SearchFilters as SearchFiltersType } from '@application/usecases/home/interfaces/IHomeUseCase';
import { Input } from '@shared/components/Input';
import { useState } from 'react';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onChange: (filters: SearchFiltersType) => void;
}

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const [esporte, setEsporte] = useState(filters.esporte || '');
  const [dataInicio, setDataInicio] = useState(
    filters.dataInicio?.toISOString().split('T')[0] || '',
  );
  const [dataFim, setDataFim] = useState(filters.dataFim?.toISOString().split('T')[0] || '');
  const [tipoPartida, setTipoPartida] = useState(filters.tipoPartida || '');
  const [status, setStatus] = useState(filters.status || '');

  const handleEsporteChange = (value: string) => {
    setEsporte(value);
    onChange({
      ...filters,
      esporte: value,
    });
  };

  const handleDataInicioChange = (value: string) => {
    const date = value ? new Date(value) : undefined;
    setDataInicio(value);
    onChange({
      ...filters,
      dataInicio: date,
    });
  };

  const handleDataFimChange = (value: string) => {
    const date = value ? new Date(value) : undefined;
    setDataFim(value);
    onChange({
      ...filters,
      dataFim: date,
    });
  };

  const handleTipoPartidaChange = (value: string) => {
    setTipoPartida(value);
    onChange({
      ...filters,
      tipoPartida: value as 'PUBLICA' | 'PRIVADA',
    });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onChange({
      ...filters,
      status: value as 'AGENDADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA',
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="esporte" className="block text-sm font-medium text-gray-700">
            Esporte
          </label>
          <Input
            id="esporte"
            type="text"
            value={esporte}
            onChange={e => handleEsporteChange(e.target.value)}
            placeholder="Futebol, Vôlei, etc."
          />
        </div>

        <div>
          <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">
            Data Início
          </label>
          <Input
            id="dataInicio"
            type="date"
            value={dataInicio}
            onChange={e => handleDataInicioChange(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">
            Data Fim
          </label>
          <Input
            id="dataFim"
            type="date"
            value={dataFim}
            onChange={e => handleDataFimChange(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tipoPartida" className="block text-sm font-medium text-gray-700">
            Tipo de Partida
          </label>
          <select
            id="tipoPartida"
            value={tipoPartida}
            onChange={e => handleTipoPartidaChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="PUBLICA">Pública</option>
            <option value="PRIVADA">Privada</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={e => handleStatusChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="AGENDADA">Agendada</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDA">Concluída</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>
      </div>
    </div>
  );
}
