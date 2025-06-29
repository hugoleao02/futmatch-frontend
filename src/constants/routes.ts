export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MATCH: {
    CREATE: '/match/create',
    DETAILS: '/match/:id',
    EDIT: '/match/edit',
  },
} as const;
