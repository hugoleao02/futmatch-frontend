import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CircularProgress, Box } from "@mui/material";
import { hasToken } from "../../services/tokenService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, loadUser } = useAuth();
  const location = useLocation();

  // Verificação adicional para garantir que o usuário está autenticado
  useEffect(() => {
    // Se não temos usuário mas temos token, tenta carregar o usuário
    if (!user && hasToken() && !loading) {
      loadUser();
    }
  }, [user, loading, loadUser]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Verificação dupla: usuário e token
  if (!user || !hasToken()) {
    // Redireciona para o login, mas salva a localização atual
    // para poder voltar depois do login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
