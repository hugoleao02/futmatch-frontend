import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { PublicRoute } from './components/routing/PublicRoute';
import { ROUTES } from './constants';
import { useRouting } from './hooks/useRouting';
import { HomePage } from './pages/HomePage';

function App() {
  const { navigateBasedOnAuth, setActiveTab } = useRouting({
    defaultRoute: ROUTES.HOME,
    authRoute: ROUTES.HOME,
    publicRoute: ROUTES.LOGIN,
  });

  useEffect(() => {
    // Redirecionar baseado no estado de autenticação
    navigateBasedOnAuth();
  }, [navigateBasedOnAuth]);

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
