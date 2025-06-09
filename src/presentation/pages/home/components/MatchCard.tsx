import type { Match } from '@domain/entities/Match';
import { formatDate } from '@shared/utils/date';

interface MatchCardProps {
  match: Match;
  onMatchDetailsClick: (matchId: string) => void;
  onOpenRecapModal: (matchName: string) => void;
}

export function MatchCard({ match, onMatchDetailsClick, onOpenRecapModal }: MatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AGENDADA':
        return 'bg-blue-100 text-blue-800';
      case 'EM_ANDAMENTO':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONCLUIDA':
        return 'bg-green-100 text-green-800';
      case 'CANCELADA':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onMatchDetailsClick(match.id)}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 truncate">{match.nome}</h3>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(match.status)}`}
          >
            {match.status}
          </span>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-500">{match.esporte}</p>
          <p className="text-sm text-gray-500">{formatDate(match.dataHora)}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-500">
              {match.participantes.length}/{match.totalJogadores} jogadores
            </span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              onOpenRecapModal(match.nome);
            }}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Gerar Resumo
          </button>
        </div>
      </div>
    </div>
  );
}
