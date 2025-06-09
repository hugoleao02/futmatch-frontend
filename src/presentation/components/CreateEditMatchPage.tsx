import { useMatch } from '@application/hooks/useMatch';
import type { Partida } from '@domain/entities/Partida';
import { Button } from '@shared/components/Button';
import { MatchForm } from '@shared/components/forms/MatchForm';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function CreateEditMatchPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { createMatch, updateMatch, getMatch, isLoading, error } = useMatch();
  const [match, setMatch] = useState<Partial<Partida> | null>(null);

  useEffect(() => {
    if (id) {
      loadMatch();
    }
  }, [id]);

  const loadMatch = async () => {
    if (!id) return;
    const data = await getMatch(id);
    if (data) {
      setMatch(data);
    }
  };

  const handleSubmit = async (formData: Partial<Partida>) => {
    try {
      if (id) {
        await updateMatch(id, formData);
      } else {
        await createMatch(formData as Omit<Partida, 'id' | 'createdAt' | 'updatedAt'>);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar partida:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {id ? 'Editar Partida' : 'Nova Partida'}
            </h1>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>

          <div className="bg-white shadow rounded-lg">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <MatchForm initialData={match} onSubmit={handleSubmit} isSubmitting={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
