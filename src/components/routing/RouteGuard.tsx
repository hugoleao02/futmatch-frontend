import React from 'react';
import { Navigate } from 'react-router-dom';
import type { IComponentProps, IRouteGuard } from '../../types';

interface RouteGuardProps extends IComponentProps {
  guard: IRouteGuard;
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ guard, children }) => {
  if (guard.canActivate()) {
    return <>{children}</>;
  }

  return <Navigate to={guard.redirectTo()} replace />;
};

// Implementação específica para rotas protegidas
export class ProtectedRouteGuard implements IRouteGuard {
  constructor(private isAuthenticated: boolean) {}

  canActivate(): boolean {
    return this.isAuthenticated;
  }

  redirectTo(): string {
    return '/login';
  }
}

// Implementação específica para rotas públicas
export class PublicRouteGuard implements IRouteGuard {
  constructor(private isAuthenticated: boolean) {}

  canActivate(): boolean {
    return !this.isAuthenticated;
  }

  redirectTo(): string {
    return '/home';
  }
}
