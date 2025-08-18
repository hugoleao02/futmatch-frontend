import { useCallback, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';

interface ConfiguracaoTentativa {
  maximoTentativas?: number;
  atrasoMs?: number;
  multiplicadorBackoff?: number;
}

interface EstadoTentativa {
  tentativas: number;
  estaTentando: boolean;
  ultimoErro: unknown;
}

export const useTentativa = (configuracao: ConfiguracaoTentativa = {}) => {
  const { maximoTentativas = 3, atrasoMs = 1000, multiplicadorBackoff = 2 } = configuracao;

  const [estadoTentativa, definirEstadoTentativa] = useState<EstadoTentativa>({
    tentativas: 0,
    estaTentando: false,
    ultimoErro: null,
  });

  const { isRetryable } = useErrorHandler();

  const executarComTentativa = useCallback(
    async <T>(operacao: () => Promise<T>): Promise<T> => {
      let ultimoErro: unknown;
      let tentativas = 0;

      while (tentativas < maximoTentativas) {
        try {
          tentativas++;
          definirEstadoTentativa(prev => ({ ...prev, tentativas, estaTentando: false }));

          const resultado = await operacao();

          // Sucesso - resetar estado
          definirEstadoTentativa({
            tentativas: 0,
            estaTentando: false,
            ultimoErro: null,
          });

          return resultado;
        } catch (erro) {
          ultimoErro = erro;
          definirEstadoTentativa(prev => ({ ...prev, ultimoErro: erro }));

          // Se não é retryable ou atingiu o limite, parar
          if (!isRetryable(erro) || tentativas >= maximoTentativas) {
            break;
          }

          // Aguardar antes da próxima tentativa
          definirEstadoTentativa(prev => ({ ...prev, estaTentando: true }));

          const atraso = atrasoMs * Math.pow(multiplicadorBackoff, tentativas - 1);
          await new Promise(resolve => setTimeout(resolve, atraso));
        }
      }

      // Todas as tentativas falharam
      definirEstadoTentativa({
        tentativas: 0,
        estaTentando: false,
        ultimoErro: null,
      });

      throw ultimoErro;
    },
    [maximoTentativas, atrasoMs, multiplicadorBackoff, isRetryable],
  );

  const redefinirTentativa = useCallback(() => {
    definirEstadoTentativa({
      tentativas: 0,
      estaTentando: false,
      ultimoErro: null,
    });
  }, []);

  return {
    executarComTentativa,
    redefinirTentativa,
    tentativas: estadoTentativa.tentativas,
    estaTentando: estadoTentativa.estaTentando,
    ultimoErro: estadoTentativa.ultimoErro,
    tentou: estadoTentativa.tentativas > 0,
  };
};
