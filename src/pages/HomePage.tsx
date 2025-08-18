import { Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PartidaCard } from '../components/PartidaCard';
import { useHomePage } from '../hooks/useHomePage';
import { useAuthStore } from '../stores/authStore';
import { homePageStyles } from '../styles';
import type { Partida } from '../types';

export const HomePage = () => {
  const navigate = useNavigate();
  const { usuario, fazerLogout } = useAuthStore();
  const { partidas, carregando, lidarComVerPartidas, lidarComCriarPartida, lidarComParticipar } =
    useHomePage();

  const lidarComLogout = () => {
    fazerLogout();
    navigate('/login');
  };

  if (carregando && partidas.length === 0) {
    return (
      <Box sx={homePageStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FutMatch
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Olá, {usuario?.nome}
          </Typography>
          <Button color="inherit" onClick={lidarComLogout} startIcon={<LogoutIcon />}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={homePageStyles.container}>
        <Box sx={homePageStyles.header}>
          <Typography variant="h4" component="h1">
            Partidas Disponíveis
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={lidarComCriarPartida}>
            Criar Partida
          </Button>
        </Box>

        {partidas.length === 0 ? (
          <Box sx={homePageStyles.emptyState}>
            <Typography variant="h6" sx={homePageStyles.emptyStateTitle}>
              Nenhuma partida disponível no momento
            </Typography>
            <Button
              variant="outlined"
              onClick={lidarComCriarPartida}
              sx={homePageStyles.emptyStateButton}
            >
              Criar a primeira partida
            </Button>
          </Box>
        ) : (
          <Box sx={homePageStyles.gridContainer}>
            {partidas.map((partida: Partida) => (
              <PartidaCard key={partida.id} partida={partida} onParticipar={lidarComParticipar} />
            ))}
          </Box>
        )}
      </Container>

      <Fab color="primary" aria-label="add" sx={homePageStyles.fab} onClick={lidarComCriarPartida}>
        <AddIcon />
      </Fab>
    </>
  );
};
