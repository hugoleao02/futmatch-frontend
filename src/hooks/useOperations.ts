import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/messages';
import type { IAsyncOperation } from '../types';
import { useErrorHandler } from './useErrorHandler';

// Constraint para itens que devem ter um ID
export interface Identificavel {
  id: number;
}

export interface ConfiguracaoOperacoes<T> {
  mostrarToastSucesso?: boolean;
  mostrarToastErro?: boolean;
  mensagemSucesso?: string;
  contextoErro?: string;
  aoSucesso?: (dados: T, operacao: string) => void;
  aoErro?: (erro: unknown, operacao: string) => void;
}

/**
 * Hook unificado para todas as operações (CRUD, API, Genéricas)
 * Responsabilidade única: Gerenciar estado e executar operações com tipagem rigorosa
 */
export const useOperations = <T, P = void>(
  configuracao: ConfiguracaoOperacoes<T> = {},
): IAsyncOperation<T, P> & {
  // Operações CRUD
  dados: T[];
  adicionarItem: (item: T) => void;
  atualizarItem: (id: number, atualizador: (item: T) => T) => void;
  removerItem: (id: number) => void;
  definirListaDados: (novosDados: T[]) => void;
  obterItemPorId: (id: number) => T | undefined;

  // Operações genéricas
  executarOperacaoGenerica: <R>(operacao: () => Promise<R>, nomeOperacao: string) => Promise<R>;
} => {
  const [carregando, definirCarregando] = useState(false);
  const [dados, definirDados] = useState<T[]>([]);
  const { handleError } = useErrorHandler();

  const {
    mostrarToastSucesso = true,
    mostrarToastErro = false,
    mensagemSucesso,
    contextoErro = 'Operação',
    aoSucesso,
    aoErro,
  } = configuracao;

  // Operação base
  const executarOperacao = useCallback(
    async (
      operacao: (parametros: P) => Promise<T>,
      parametros: P,
      mensagemSucessoPersonalizada?: string,
      contextoErroPersonalizado?: string,
    ): Promise<T> => {
      definirCarregando(true);
      try {
        const resultado = await operacao(parametros);

        if (mostrarToastSucesso && (mensagemSucessoPersonalizada || mensagemSucesso)) {
          toast.success(
            mensagemSucessoPersonalizada || mensagemSucesso || 'Operação realizada com sucesso!',
          );
        }

        aoSucesso?.(resultado, contextoErroPersonalizado || contextoErro);
        return resultado;
      } catch (erro) {
        const contexto = contextoErroPersonalizado || contextoErro;

        if (mostrarToastErro) {
          toast.error(ERROR_MESSAGES.GENERIC_ERROR);
        }

        aoErro?.(erro, contexto);
        handleError(erro, contexto);
        throw erro;
      } finally {
        definirCarregando(false);
      }
    },
    [
      handleError,
      mostrarToastSucesso,
      mostrarToastErro,
      mensagemSucesso,
      contextoErro,
      aoSucesso,
      aoErro,
    ],
  );

  const executarOperacaoSemParametros = useCallback(
    async (
      operacao: () => Promise<T>,
      mensagemSucessoPersonalizada?: string,
      contextoErroPersonalizado?: string,
    ): Promise<T> => {
      return executarOperacao(
        () => operacao(),
        undefined as P,
        mensagemSucessoPersonalizada,
        contextoErroPersonalizado,
      );
    },
    [executarOperacao],
  );

  // Operações CRUD
  const adicionarItem = useCallback((item: T) => {
    definirDados(prev => [...prev, item]);
  }, []);

  const atualizarItem = useCallback((id: number, atualizador: (item: T) => T) => {
    definirDados(prev =>
      prev.map(item => ((item as Identificavel).id === id ? atualizador(item) : item)),
    );
  }, []);

  const removerItem = useCallback((id: number) => {
    definirDados(prev => prev.filter(item => (item as Identificavel).id !== id));
  }, []);

  const definirListaDados = useCallback((novosDados: T[]) => {
    definirDados(novosDados);
  }, []);

  const obterItemPorId = useCallback(
    (id: number): T | undefined => {
      return dados.find(item => (item as Identificavel).id === id);
    },
    [dados],
  );

  // Operações genéricas
  const executarOperacaoGenerica = useCallback(
    async <R>(operacao: () => Promise<R>, nomeOperacao: string): Promise<R> => {
      try {
        const resposta = await executarOperacaoSemParametros(
          () => operacao().then(resultado => resultado as unknown as T),
          nomeOperacao,
        );
        return resposta as unknown as R;
      } catch (erro) {
        throw erro;
      }
    },
    [executarOperacaoSemParametros],
  );

  return {
    execute: executarOperacao,
    executeOperationWithoutParams: executarOperacaoSemParametros,
    loading: carregando,
    // Operações CRUD
    dados,
    adicionarItem,
    atualizarItem,
    removerItem,
    definirListaDados,
    obterItemPorId,
    // Operações genéricas
    executarOperacaoGenerica,
  };
};
