import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRouteGuard, PublicRouteGuard, RouteGuard } from './components/routing/RouteGuard';
import { ROUTES } from './constants';
import { useAuth } from './hooks/useAuthNew';
import { HomePage } from './pages/HomePage';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  const guard = new ProtectedRouteGuard(isAuthenticated);
  return <RouteGuard guard={guard}>{children}</RouteGuard>;
};

// Componente para rotas públicas (quando já está logado)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  const guard = new PublicRouteGuard(isAuthenticated);
  return <RouteGuard guard={guard}>{children}</RouteGuard>;
};

function App() {
  const [, setActiveTab] = useState(0);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginForm setActiveTab={() => setActiveTab(1)} />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
