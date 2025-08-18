/**
 * Utilitários para verificação de ambiente
 * Substitui o uso de process.env.NODE_ENV por import.meta.env (padrão Vite)
 */

export const isDevelopment = (): boolean => import.meta.env.DEV;
export const isProduction = (): boolean => import.meta.env.PROD;
export const isTest = (): boolean => import.meta.env.MODE === 'test';

/**
 * Verifica se deve mostrar informações de debug
 */
export const shouldShowDebugInfo = (): boolean => isDevelopment();

/**
 * Verifica se deve usar DevTools
 */
export const shouldUseDevTools = (): boolean => isDevelopment();

/**
 * Obtém o modo atual da aplicação
 */
export const getCurrentMode = (): string => import.meta.env.MODE;
