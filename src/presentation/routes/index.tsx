import { Navigate, Route, Routes as RouterRoutes, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/hooks';

import { LoginPage } from '../pages/AuthPage/AuthPage';
import { HomePage } from '../pages/homePage';

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
      <Route
        path="/login"
        element={
          <>
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a2a3a] via-[#22334a] to-[#0a101a]" />
              <div className="absolute top-8 left-1/4 w-48 h-16 bg-cyan-200/40 blur-2xl rounded-full" />
              <div className="absolute top-4 left-1/2 w-60 h-20 bg-cyan-300/30 blur-2xl rounded-full -translate-x-1/2" />
              <div className="absolute top-8 right-1/4 w-48 h-16 bg-cyan-200/40 blur-2xl rounded-full" />
              <div className="absolute bottom-12 left-1/3 w-40 h-12 bg-cyan-400/20 blur-2xl rounded-full" />
              <div className="absolute bottom-12 right-1/3 w-40 h-12 bg-cyan-400/20 blur-2xl rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </div>
            <LoginPage />
          </>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </RouterRoutes>
  );
}
