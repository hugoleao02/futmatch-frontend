import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAutenticacao } from '../../hooks/useAutenticacao';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { estaAutenticado, carregando } = useAutenticacao();

  if (carregando) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (estaAutenticado) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};
