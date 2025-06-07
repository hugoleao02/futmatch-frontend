export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Main routes
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  // Match routes
  MATCHES: '/matches',
  MATCH_DETAILS: (id: string) => `/matches/${id}`,
  CREATE_MATCH: '/matches/create',
  EDIT_MATCH: (id: string) => `/matches/${id}/edit`,

  // Room routes
  ROOMS: '/rooms',
  ROOM_DETAILS: (id: string) => `/rooms/${id}`,
  CREATE_ROOM: '/rooms/create',
  EDIT_ROOM: (id: string) => `/rooms/${id}/edit`,

  // Settings routes
  SETTINGS: '/settings',
  NOTIFICATIONS: '/settings/notifications',
  PRIVACY: '/settings/privacy',

  // Static routes
  ABOUT: '/about',
  HELP: '/help',
  TERMS: '/terms',
  PRIVACY_POLICY: '/privacy-policy',
} as const;

export const API_ROUTES = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User endpoints
  USER_PROFILE: '/users/me',
  UPDATE_PROFILE: '/users/me',
  USER_MATCHES: '/users/me/matches',
  USER_ROOMS: '/users/me/rooms',

  // Match endpoints
  MATCHES: '/matches',
  MATCH_BY_ID: (id: string) => `/matches/${id}`,
  JOIN_MATCH: (id: string) => `/matches/${id}/join`,
  LEAVE_MATCH: (id: string) => `/matches/${id}/leave`,

  // Room endpoints
  ROOMS: '/rooms',
  ROOM_BY_ID: (id: string) => `/rooms/${id}`,
  JOIN_ROOM: (id: string) => `/rooms/${id}/join`,
  LEAVE_ROOM: (id: string) => `/rooms/${id}/leave`,
} as const;
