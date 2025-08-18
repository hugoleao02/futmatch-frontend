// ============================================================================
// SERVIÇOS BASE
// ============================================================================

// Classe base para todos os serviços
export { ServicoBase } from './BaseService';

// Classe para operações assíncronas
// export { AsyncOperation } from './AsyncOperation';

// Cliente HTTP para comunicação com API
export { HttpClient } from './HttpClient';

// Fábrica para criação de instâncias de serviços
export { FabricaServicos } from './ServiceFactory';

// ============================================================================
// SERVIÇOS DE DOMÍNIO
// ============================================================================

// Serviço de autenticação
export { ServicoAutenticacao } from './AuthService';

// Serviço de partidas
export { PartidaService } from './PartidaService';

// Serviço de participação
export { ParticipacaoService } from './ParticipacaoService';

// ============================================================================
// SERVIÇOS AUXILIARES
// ============================================================================

// Serviço de notificações
export { NotificationService } from './NotificationService';

// Serviços de validação
export { AuthValidationService, ValidationService } from './ValidationService';

// Serviço de tratamento de erros
export { ErrorService } from './errorService';
