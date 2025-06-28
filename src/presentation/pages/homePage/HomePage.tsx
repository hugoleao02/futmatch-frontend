import { Add as AddIcon, SportsSoccer as SportsSoccerIcon } from '@mui/icons-material';
import { Box, Button, Container, Fab, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { checkToken, testApiConnection } from '../../../shared/utils/api';
import { AppBarSection, FilterSection, GeradorResumo, SecaoPartidas } from './components';
import { TEXTO_BOTAO_MAPA, TOOLTIP_CRIAR } from './constants';
import { useHomeHandlers } from './hooks/useManipuladoresPaginaInicial';
import { useHome } from './hooks/usePaginaInicial';
import { homeStyles } from './styles/homeStyles';

export const HomePage: React.FC = () => {
  const {
    loading,
    showMap,
    filters,
    searchMatches,
    generateRecap,
    updateFilter,
    toggleMapView,
    availableMatches,
    loadData,
  } = useHome();

  useEffect(() => {
    checkToken();
    testApiConnection();
    loadData();
  }, [loadData]);

  const {
    openRecapModal,
    selectedMatchNameForRecap,
    handleLogout,
    handleProfileClick,
    handleCreateNewSoloMatch,
    handleMatchDetailsClick,
    handleOpenRecapModal,
    handleCloseRecapModal,
  } = useHomeHandlers();

  const [anchorElFabMenu, setAnchorElFabMenu] = useState<null | HTMLElement>(null);

  const handleOpenFabMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFabMenu(event.currentTarget);
  };

  const handleCloseFabMenu = () => {
    setAnchorElFabMenu(null);
  };

  return (
    <Box sx={homeStyles.container}>
      <AppBarSection
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onCreateNewSoloMatch={handleCreateNewSoloMatch}
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <FilterSection
          filters={filters}
          loading={loading}
          onUpdateFilter={updateFilter}
          onSearchMatches={searchMatches}
        />

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
        <Fab color="primary" aria-label="add" sx={homeStyles.fab} onClick={handleOpenFabMenu}>
          <AddIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>

      <Menu anchorEl={anchorElFabMenu} open={Boolean(anchorElFabMenu)} onClose={handleCloseFabMenu}>
        <MenuItem
          onClick={() => {
            handleCreateNewSoloMatch();
            handleCloseFabMenu();
          }}
        >
          <SportsSoccerIcon sx={{ mr: 1 }} /> Criar Partida Avulsa
        </MenuItem>
      </Menu>

      <GeradorResumo
        open={openRecapModal}
        onClose={handleCloseRecapModal}
        matchName={selectedMatchNameForRecap || ''}
        onGenerateRecap={generateRecap}
      />
    </Box>
  );
};
