import React from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { RouteGuard, PublicRouteGuard } from './RouteGuard';
import { useAuth } from '../../hooks/useAuthNew';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  const guard = new PublicRouteGuard(isAuthenticated);
  return <RouteGuard guard={guard}>{children}</RouteGuard>;
};
