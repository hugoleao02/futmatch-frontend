import type { RouteObject } from 'react-router-dom';
import { AuthPage } from '../pages/auth';
import { CreateEditMatchPage } from '../pages/partida';
import { HomePage } from '../pages/homePage';
import { PartidaDetalhesPage } from '../pages/partidaDetalhes';

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/home',
  MATCH: {
    CREATE: '/match/create',
    EDIT: '/match/edit',
    DETAILS: '/match/details/:id',
  },
} as const;

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.MATCH.CREATE,
    element: <CreateEditMatchPage />,
  },
  {
    path: ROUTES.MATCH.EDIT,
    element: <CreateEditMatchPage />,
  },
  {
    path: ROUTES.MATCH.DETAILS,
    element: <PartidaDetalhesPage />,
  },
];
