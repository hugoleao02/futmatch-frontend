// ============================================================================
// COMPONENTES PRINCIPAIS
// ============================================================================

// Componentes de autenticação
export { AuthScreen } from './AuthScreen';
export { LoginForm } from './LoginForm';
export { RegisterForm } from './RegisterForm';

// Componentes de partida
export { PartidaCard } from './PartidaCard';

// ============================================================================
// COMPONENTES COMUNS
// ============================================================================

export { ErrorFallback } from './common/ErrorFallback';
export { LoadingSpinner } from './common/LoadingSpinner';

// ============================================================================
// COMPONENTES DE LAYOUT
// ============================================================================

export { AppLayout } from './layout/AppLayout';

// ============================================================================
// COMPONENTES DE ROTEAMENTO
// ============================================================================

export { ProtectedRoute } from './routing/ProtectedRoute';
export { PublicRoute } from './routing/PublicRoute';
export { ProtectedRouteGuard, PublicRouteGuard, RouteGuard } from './routing/RouteGuard';
