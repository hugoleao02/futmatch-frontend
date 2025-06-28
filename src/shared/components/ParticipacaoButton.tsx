import React from 'react';
import { useParticipacao } from '../hooks/useParticipacao';

interface ParticipacaoButtonProps {
  partidaId: number;
  isParticipating?: boolean;
  onParticipacaoChange?: () => void;
}

export const ParticipacaoButton: React.FC<ParticipacaoButtonProps> = ({
  partidaId,
  isParticipating = false,
  onParticipacaoChange,
}) => {
  const { loading, participarPartida, cancelarParticipacao } = useParticipacao();

  const handleParticipacao = async () => {
    if (isParticipating) {
      const success = await cancelarParticipacao(partidaId);
      if (success && onParticipacaoChange) {
        onParticipacaoChange();
      }
    } else {
      const participacao = await participarPartida(partidaId);
      if (participacao && onParticipacaoChange) {
        onParticipacaoChange();
      }
    }
  };

  return (
    <button
      onClick={handleParticipacao}
      disabled={loading}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isParticipating
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span>Carregando...</span>
      ) : isParticipating ? (
        'Cancelar Participação'
      ) : (
        'Participar'
      )}
    </button>
  );
};
