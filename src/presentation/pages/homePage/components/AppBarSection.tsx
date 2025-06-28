import {
  Add as AddIcon,
  Logout as LogoutIcon,
  SportsSoccer as SportsSoccerIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { homeStyles } from '../styles/homeStyles';

interface AppBarSectionProps {
  onProfileClick: () => void;
  onLogout: () => void;
  onCreateNewSoloMatch: () => void;
}

export const AppBarSection: React.FC<AppBarSectionProps> = ({
  onProfileClick,
  onLogout,
  onCreateNewSoloMatch,
}) => {
  const [anchorElCreateMenu, setAnchorElCreateMenu] = useState<null | HTMLElement>(null);

  const handleOpenCreateMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCreateMenu(event.currentTarget);
  };

  const handleCloseCreateMenu = () => {
    setAnchorElCreateMenu(null);
  };

  return (
    <AppBar position="static" sx={homeStyles.appBar}>
      <Toolbar sx={homeStyles.toolbar}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={homeStyles.logo}>
            FutMATCH
          </Typography>
          <Typography variant="subtitle1" sx={homeStyles.subtitle}>
            Sua pelada perfeita te espera!
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" onClick={onProfileClick} sx={homeStyles.profileButton}>
            Meu Perfil
          </Button>

          <Button
            variant="contained"
            sx={homeStyles.actionButton}
            onClick={handleOpenCreateMenu}
            startIcon={<AddIcon />}
          >
            Criar
          </Button>

          <IconButton color="inherit" onClick={onLogout} sx={homeStyles.logoutButton} title="Sair">
            <LogoutIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElCreateMenu}
            open={Boolean(anchorElCreateMenu)}
            onClose={handleCloseCreateMenu}
          >
            <MenuItem onClick={onCreateNewSoloMatch}>
              <SportsSoccerIcon sx={{ mr: 1 }} /> Criar Partida Avulsa
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
