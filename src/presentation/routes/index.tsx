import { useAuth } from '@shared/hooks';
import type { RouteObject } from 'react-router-dom';
import { Navigate, Route, Routes as RouterRoutes, useLocation } from 'react-router-dom';
import { ROUTES, routes } from './routes';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <RouterRoutes>
      {routes.map((route: RouteObject) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.path === ROUTES.LOGIN ? (
              route.element
            ) : (
              <PrivateRoute>{route.element}</PrivateRoute>
            )
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </RouterRoutes>
  );
}
