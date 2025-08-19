import { useMemo } from 'react';
import type { ConfiguracaoFormulario } from '../types/formularios';

// Hook genérico para configuração de formulários
export const useConfiguracaoFormularios = <T extends ConfiguracaoFormulario>(
  configuracao: T[]
): T[] => {
  return useMemo(() => configuracao, [configuracao]);
};
