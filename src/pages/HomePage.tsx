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
import { PartidaCard } from '../components/PartidaCard';
import { useHomePage } from '../hooks/useHomePage';
import { homePageStyles } from '../styles';
import type { Partida } from '../types';

export const HomePage = () => {
  const {
    user,
    partidas,
    loading,
    page,
    setPage,
    handleParticipar,
    handleCriarPartida,
    handleLogout,
  } = useHomePage();

  if (loading && partidas.length === 0) {
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
            Olá, {user?.nome}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={homePageStyles.container}>
        <Box sx={homePageStyles.header}>
          <Typography variant="h4" component="h1">
            Partidas Disponíveis
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCriarPartida}>
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
              onClick={handleCriarPartida}
              sx={homePageStyles.emptyStateButton}
            >
              Criar a primeira partida
            </Button>
          </Box>
        ) : (
          <Box sx={homePageStyles.gridContainer}>
            {partidas.map((partida: Partida) => (
              <PartidaCard key={partida.id} partida={partida} onParticipar={handleParticipar} />
            ))}
          </Box>
        )}

        {partidas.length > 0 && (
          <Box sx={homePageStyles.loadMoreContainer}>
            <Button variant="outlined" onClick={() => setPage(page + 1)} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Carregar Mais'}
            </Button>
          </Box>
        )}
      </Container>

      <Fab color="primary" aria-label="add" sx={homePageStyles.fab} onClick={handleCriarPartida}>
        <AddIcon />
      </Fab>
    </>
  );
};
