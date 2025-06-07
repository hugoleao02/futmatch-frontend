import { Routes as RouterRoutes, Route, Navigate, useLocation } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage/LoginPage';
// import { RegisterPage } from '../pages/registerPage/RegisterPage'; // Manter como antes se você removeu ou redirecionou
// Se você está usando o redirecionamento conforme a última instrução:
// import { RegisterPage } from '../pages/registerPage/RegisterPage'; // Remover esta linha
// Exemplo: <Route path="/register" element={<Navigate to="/login" replace />} />

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export function AppRoutes() {
  return (
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
      <RouterRoutes>
        <Route path="/login" element={<LoginPage />} />
        {/* Se você removeu RegisterPage.tsx e quer redirecionar */}
        {/* <Route path="/register" element={<Navigate to="/login" replace />} /> */}
        {/* Se você ainda tiver RegisterPage, mas não a está usando mais diretamente na rota */}
        <Route path="/register" element={<LoginPage />} /> {/* Aponta para LoginPage agora que é unificada */}
        <Route path="/" element={
          <PrivateRoute>
            <div>Página Principal</div>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </RouterRoutes>
    </>
  );
}