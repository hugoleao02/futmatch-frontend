import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Container, Fab, Tooltip } from '@mui/material';
import React from 'react';
import {
  AppBarSection,
  FilterSection,
  GeradorResumo,
  SecaoPartidas,
  SecaoSalas,
} from './components';
import { TEXTO_BOTAO_MAPA, TOOLTIP_CRIAR } from './constants';
import { useHomeHandlers } from './hooks/useManipuladoresPaginaInicial';
import { useHome } from './hooks/usePaginaInicial';
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
        <FilterSection
          filters={filters}
          loading={loading}
          onUpdateFilter={updateFilter}
          onSearchMatches={searchMatches}
        />

        <SecaoSalas salas={rooms} onRoomDetailsClick={handleRoomDetailsClick} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant="outlined" onClick={toggleMapView} sx={homeStyles.mapViewButton}>
            {showMap ? TEXTO_BOTAO_MAPA.LISTA : TEXTO_BOTAO_MAPA.MAPA}
          </Button>
        </Box>

        <SecaoPartidas
          partidas={availableMatches}
          mostrarMapa={showMap}
          onMatchDetailsClick={handleMatchDetailsClick}
          onOpenRecapModal={handleOpenRecapModal}
        />
      </Container>

      <Tooltip title={TOOLTIP_CRIAR} arrow>
        <Fab color="primary" aria-label="add" sx={homeStyles.fab} onClick={handleOpenCreateMenu}>
          <AddIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>

      <GeradorResumo
        open={openRecapModal}
        onClose={handleCloseRecapModal}
        matchName={selectedMatchNameForRecap}
        onGenerateRecap={generateRecap}
      />
    </Box>
  );
};
