import type { RouteObject } from 'react-router-dom';
import { AuthPage } from '../components/AuthPage';
import { CreateEditMatchPage } from '../components/CreateEditMatchPage';
import { HomePage } from '../components/HomePage';
import { MatchDetailsPage } from '../components/MatchDetailsPage';

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  CREATE_MATCH: '/matches/create',
  EDIT_MATCH: '/matches/:id/edit',
  MATCH_DETAILS: '/matches/:id',
} as const;

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <AuthPage />,
  },
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.CREATE_MATCH,
    element: <CreateEditMatchPage />,
  },
  {
    path: ROUTES.EDIT_MATCH,
    element: <CreateEditMatchPage />,
  },
  {
    path: ROUTES.MATCH_DETAILS,
    element: <MatchDetailsPage />,
  },
];
