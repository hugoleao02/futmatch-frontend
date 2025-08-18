// ============================================================================
// HOOKS BASE
// ============================================================================

// Hook para operações assíncronas
export { useAsyncOperation } from './useAsyncOperation';

// Hook genérico para operações de serviço
export { useServiceOperations } from './useServiceOperations';

// Hook genérico para formulários
export { useFormOperations } from './useFormOperations';

// Hook genérico para operações CRUD
export { useCrudOperations } from './useCrudOperations';

// ============================================================================
// HOOKS DE DOMÍNIO
// ============================================================================

// Hook de autenticação
export { useAuth } from './useAuthNew';

// Hook de partidas
export { usePartidas } from './usePartidas';

// Hook de participação
export { useParticipacao } from './useParticipacao';

// Hook de página inicial
export { useHomePage } from './useHomePage';

// ============================================================================
// HOOKS DE FORMULÁRIO
// ============================================================================

// Hook de formulário de login
export { useLoginForm } from './useLoginForm';

// Hook de formulário de registro
export { useRegisterForm } from './useRegisterForm';

// ============================================================================
// HOOKS AUXILIARES
// ============================================================================

// Hook de tratamento de erros
export { useErrorHandler } from './useErrorHandler';

// Hook de navegação
export { useNavigation } from './useNavigation';

// Hook de armazenamento local
export { useLocalStorage } from './useLocalStorage';

// Hook de retry para operações
export { useRetry } from './useRetry';
