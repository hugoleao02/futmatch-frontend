// Rotas compartilhadas do sistema
export const ROUTES = {
  // Rotas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Rotas autenticadas
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Rotas de partidas
  MATCHES: '/matches',
  MATCH_DETAILS: '/matches/:id',
  CREATE_MATCH: '/matches/create',
  
  // Rotas de usuários
  USERS: '/users',
  USER_PROFILE: '/users/:id',
  
  // Rotas de administração
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_MATCHES: '/admin/matches',
} as const;

// Tipos para as rotas
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];
