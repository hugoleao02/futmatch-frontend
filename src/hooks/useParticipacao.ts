import { useCallback } from 'react';
import { obterContainerDependencias } from '../config/dependencyInjection';
import type { Participacao } from '../types';
import { useOperations } from './useOperations';

export const useParticipacao = () => {
  const { executarOperacaoGenerica, loading } = useOperations<Participacao>();
  const servicoParticipacao = obterContainerDependencias().getServicoParticipacao();

  const participarPartida = useCallback(
    async (partidaId: number) => {
      try {
        const participacao = await servicoParticipacao.participarPartida(partidaId);
        return participacao;
      } catch (erro) {
        console.error('Erro ao participar da partida:', erro);
        throw erro;
      }
    },
    [servicoParticipacao],
  );

  const cancelarParticipacao = useCallback(
    async (partidaId: number) => {
      try {
        await servicoParticipacao.cancelarParticipacao(partidaId);
      } catch (erro) {
        console.error('Erro ao cancelar participação:', erro);
        throw erro;
      }
    },
    [servicoParticipacao],
  );

  const aprovarParticipacao = useCallback(
    async (partidaId: number, participanteId: number) => {
      try {
        const participacao = await servicoParticipacao.aprovarParticipacao(
          partidaId,
          participanteId,
        );
        return participacao;
      } catch (erro) {
        console.error('Erro ao aprovar participação:', erro);
        throw erro;
      }
    },
    [servicoParticipacao],
  );

  const rejeitarParticipacao = useCallback(
    async (partidaId: number, participanteId: number) => {
      try {
        const participacao = await servicoParticipacao.rejeitarParticipacao(
          partidaId,
          participanteId,
        );
        return participacao;
      } catch (erro) {
        console.error('Erro ao rejeitar participação:', erro);
        throw erro;
      }
    },
    [servicoParticipacao],
  );

  return {
    carregando: loading,
    executarOperacaoGenerica,
    participarPartida,
    cancelarParticipacao,
    aprovarParticipacao,
    rejeitarParticipacao,
  };
};
