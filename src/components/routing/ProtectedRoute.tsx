import React from 'react';
import { useAuth } from '../../hooks/useAuthNew';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ProtectedRouteGuard, RouteGuard } from './RouteGuard';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  const guard = new ProtectedRouteGuard(isAuthenticated);
  return <RouteGuard guard={guard}>{children}</RouteGuard>;
};
