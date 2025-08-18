import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { LoadingSpinner } from './components/common';
import { AppLayout } from './components/layout';
import { ROUTES } from './constants';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

// Componente para rotas públicas (quando já está logado)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.HOME} replace />;
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginForm />
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
