import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Container, Fab, Grid, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { AppBarSection } from './components/AppBarSection';
import { FilterSection } from './components/FilterSection';
import { GameRecapGenerator } from './components/GameRecapGenerator';
import { PartidaCard } from './components/PartidaCard.tsx';
import { RoomCard } from './components/RoomCard';
import { useHome } from './hooks/useHome';
import { useHomeHandlers } from './hooks/useHomeHandlers';
import { homeStyles } from './styles/homeStyles';

export const HomePage: React.FC = () => {
  const {
    rooms,
    loading,
    showMap,
    filters,
    searchMatches,
    generateRecap,
    updateFilter,
    toggleMapView,
    availableMatches,
  } = useHome();

  const {
    anchorElCreateMenu,
    openRecapModal,
    selectedMatchNameForRecap,
    handleLogout,
    handleProfileClick,
    handleOpenCreateMenu,
    handleCloseCreateMenu,
    handleCreateNewRoom,
    handleCreateNewSoloMatch,
    handleMatchDetailsClick,
    handleRoomDetailsClick,
    handleOpenRecapModal,
    handleCloseRecapModal,
  } = useHomeHandlers();

  return (
    <Box sx={homeStyles.container}>
      {/* AppBar */}
      <AppBarSection
        anchorElCreateMenu={anchorElCreateMenu}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onOpenCreateMenu={handleOpenCreateMenu}
        onCloseCreateMenu={handleCloseCreateMenu}
        onCreateNewRoom={handleCreateNewRoom}
        onCreateNewSoloMatch={handleCreateNewSoloMatch}
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Seção de Filtros */}
        <FilterSection
          filters={filters}
          loading={loading}
          onUpdateFilter={updateFilter}
          onSearchMatches={searchMatches}
        />

        {/* Seção Minhas Salas */}
        <Paper elevation={3} sx={homeStyles.section}>
          <Typography variant="h5" component="h2" sx={homeStyles.sectionTitle}>
            Minhas Salas
          </Typography>

          {rooms.length > 0 ? (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {rooms.map(room => (
                <RoomCard key={room.id} room={room} onRoomDetailsClick={handleRoomDetailsClick} />
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Você ainda não faz parte de nenhuma sala. Crie uma!
            </Typography>
          )}
        </Paper>

        {/* Botão alternar visualização */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant="outlined" onClick={toggleMapView} sx={homeStyles.mapViewButton}>
            {showMap ? 'Ver em Lista' : 'Ver no Mapa'}
          </Button>
        </Box>

        {/* Seção Partidas Avulsas */}
        <Typography variant="h5" component="h2" sx={homeStyles.sectionTitle}>
          Partidas Próximas (Avulsas)
        </Typography>

        {showMap ? (
          <Paper elevation={3} sx={homeStyles.mapPlaceholder}>
            <Typography variant="h6" color="text.secondary">
              [Placeholder: Mapa Interativo com Localização das Partidas Avulsas]
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {availableMatches.map(match => (
              <PartidaCard
                key={match.id}
                match={match}
                onMatchDetailsClick={handleMatchDetailsClick}
                onOpenRecapModal={handleOpenRecapModal}
              />
            ))}
            {availableMatches.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" color="text.secondary" textAlign="center" mt={4}>
                  Nenhuma partida avulsa encontrada.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      {/* Botão Flutuante */}
      <Tooltip title="Criar Nova Partida ou Sala" arrow>
        <Fab color="primary" aria-label="add" sx={homeStyles.fab} onClick={handleOpenCreateMenu}>
          <AddIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>

      {/* Modal Gerador de Resumo */}
      <GameRecapGenerator
        open={openRecapModal}
        onClose={handleCloseRecapModal}
        matchName={selectedMatchNameForRecap}
        onGenerateRecap={generateRecap}
      />
    </Box>
  );
};
