import { useCallback, useState } from 'react';

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valorArmazenado, definirValorArmazenado] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(chave);
      return item ? JSON.parse(item) : valorInicial;
    } catch (erro) {
      console.error(`Erro ao ler localStorage chave "${chave}":`, erro);
      return valorInicial;
    }
  });

  const definirValor = useCallback(
    (valor: T | ((val: T) => T)) => {
      try {
        const valorParaArmazenar = valor instanceof Function ? valor(valorArmazenado) : valor;
        definirValorArmazenado(valorParaArmazenar);
        window.localStorage.setItem(chave, JSON.stringify(valorParaArmazenar));
      } catch (erro) {
        console.error(`Erro ao definir localStorage chave "${chave}":`, erro);
      }
    },
    [chave, valorArmazenado],
  );

  const removerValor = useCallback(() => {
    try {
      definirValorArmazenado(valorInicial);
      window.localStorage.removeItem(chave);
    } catch (erro) {
      console.error(`Erro ao remover localStorage chave "${chave}":`, erro);
    }
  }, [chave, valorInicial]);

  return [valorArmazenado, definirValor, removerValor] as const;
}
