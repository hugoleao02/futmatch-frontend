import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { PublicRoute } from './components/routing/PublicRoute';
import { ROUTES } from './constants';
import { useRoteamento } from './hooks/useRoteamento';
import { HomePage } from './pages/HomePage';

function App() {
  const { navegarBaseadoNaAutenticacao, definirAbaAtiva } = useRoteamento({
    rotaPadrao: ROUTES.HOME,
    rotaAutenticada: ROUTES.HOME,
    rotaPublica: ROUTES.LOGIN,
  });

  useEffect(() => {
    // Redirecionar baseado no estado de autenticação
    navegarBaseadoNaAutenticacao();
  }, [navegarBaseadoNaAutenticacao]);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginForm definirAbaAtiva={() => definirAbaAtiva(1)} />
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
