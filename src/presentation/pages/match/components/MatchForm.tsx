import type { Partida, StatusPartida, TipoPartida } from '@domain/entities/Partida';
import { Button } from '@shared/components/Button';
import { TextField } from '@shared/components/forms/TextField';
import { useEffect, useState } from 'react';

interface MatchFormProps {
  initialData?: Partial<Partida> | null;
  onSubmit: (data: Partial<Partida>) => void;
  isSubmitting?: boolean;
}

export function MatchForm({ initialData, onSubmit, isSubmitting }: MatchFormProps) {
  const [formData, setFormData] = useState<Partial<Partida>>({
    nome: '',
    esporte: '',
    dataHora: new Date(),
    latitude: 0,
    longitude: 0,
    totalJogadores: 0,
    tipoPartida: 'PUBLICA' as TipoPartida,
    status: 'AGENDADA' as StatusPartida,
    participantes: [],
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (field: keyof Partida, value: string | number | Date | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Nome da Partida"
          value={formData.nome}
          onChange={e => handleChange('nome', e.target.value)}
          required
        />

        <TextField
          label="Esporte"
          value={formData.esporte}
          onChange={e => handleChange('esporte', e.target.value)}
          required
        />

        <TextField
          label="Data e Hora"
          type="datetime-local"
          value={
            formData.dataHora instanceof Date ? formData.dataHora.toISOString().slice(0, 16) : ''
          }
          onChange={e => handleChange('dataHora', new Date(e.target.value))}
          required
        />

        <TextField
          label="Latitude"
          type="number"
          value={formData.latitude}
          onChange={e => handleChange('latitude', parseFloat(e.target.value))}
          required
          step="any"
        />

        <TextField
          label="Longitude"
          type="number"
          value={formData.longitude}
          onChange={e => handleChange('longitude', parseFloat(e.target.value))}
          required
          step="any"
        />

        <TextField
          label="Total de Jogadores"
          type="number"
          value={formData.totalJogadores}
          onChange={e => handleChange('totalJogadores', parseInt(e.target.value))}
          required
          min={2}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Partida</label>
          <select
            value={formData.tipoPartida}
            onChange={e => handleChange('tipoPartida', e.target.value as TipoPartida)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="PUBLICA">Pública</option>
            <option value="PRIVADA">Privada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={e => handleChange('status', e.target.value as StatusPartida)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="AGENDADA">Agendada</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="FINALIZADA">Finalizada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
