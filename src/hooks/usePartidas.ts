import { useCallback, useEffect, useState } from 'react';
import { obterContainerDependencias } from '../config/dependencyInjection';
import type { Partida, PartidaRequest, PartidaUpdateRequest } from '../types';
import { useOperations } from './useOperations';

export const usePartidas = () => {
  const [partidas, definirPartidas] = useState<Partida[]>([]);
  const [pagina, definirPagina] = useState(0);
  const [tamanho, definirTamanho] = useState(10);

  const {
    loading,
    execute,
    executarOperacaoGenerica,
    dados,
    adicionarItem,
    atualizarItem,
    removerItem,
    definirListaDados,
    obterItemPorId,
  } = useOperations<Partida>();

  const servicoPartida = obterContainerDependencias().getServicoPartida();

  // Carregar partidas na inicialização
  useEffect(() => {
    const carregarPartidas = async () => {
      try {
        const dadosPartidas = await servicoPartida.listarPartidas();
        definirPartidas(dadosPartidas);
        definirListaDados(dadosPartidas);
      } catch (erro) {
        console.error('Erro ao carregar partidas:', erro);
      }
    };

    carregarPartidas();
  }, [servicoPartida, definirListaDados]);

  const listarPartidasFuturas = useCallback(
    async (numeroPagina: number = pagina, tamanhoPagina: number = tamanho) => {
      try {
        const resposta = await servicoPartida.listarPartidasFuturas(numeroPagina, tamanhoPagina);
        definirPartidas(resposta.content || []);
        definirListaDados(resposta.content || []);
        definirPagina(numeroPagina);
        definirTamanho(tamanhoPagina);
        return resposta;
      } catch (erro) {
        console.error('Erro ao listar partidas futuras:', erro);
        throw erro;
      }
    },
    [servicoPartida, pagina, tamanho, definirListaDados],
  );

  const buscarPartidaPorId = useCallback(
    async (id: number): Promise<Partida | null> => {
      try {
        const partida = await servicoPartida.buscarPartidaPorId(id);
        return partida;
      } catch (erro) {
        console.error('Erro ao buscar partida por ID:', erro);
        throw erro;
      }
    },
    [servicoPartida],
  );

  const criarPartida = useCallback(
    async (dadosPartida: PartidaRequest): Promise<Partida> => {
      try {
        const novaPartida = await servicoPartida.criarPartida(dadosPartida);
        adicionarItem(novaPartida);
        return novaPartida;
      } catch (erro) {
        console.error('Erro ao criar partida:', erro);
        throw erro;
      }
    },
    [servicoPartida, adicionarItem],
  );

  const atualizarPartida = useCallback(
    async (id: number, dadosAtualizacao: PartidaUpdateRequest): Promise<Partida> => {
      try {
        const partidaAtualizada = await servicoPartida.atualizarPartida(id, dadosAtualizacao);
        atualizarItem(id, () => partidaAtualizada);
        return partidaAtualizada;
      } catch (erro) {
        console.error('Erro ao atualizar partida:', erro);
        throw erro;
      }
    },
    [servicoPartida, atualizarItem],
  );

  const deletarPartida = useCallback(
    async (id: number): Promise<void> => {
      try {
        await servicoPartida.deletarPartida(id);
        removerItem(id);
      } catch (erro) {
        console.error('Erro ao deletar partida:', erro);
        throw erro;
      }
    },
    [servicoPartida, removerItem],
  );

  return {
    partidas,
    pagina,
    tamanho,
    carregando: loading,
    executar: execute,
    executarOperacaoGenerica,
    dados,
    adicionarItem,
    atualizarItem,
    removerItem,
    definirListaDados,
    obterItemPorId,
    listarPartidasFuturas,
    buscarPartidaPorId,
    criarPartida,
    atualizarPartida,
    deletarPartida,
  };
};
