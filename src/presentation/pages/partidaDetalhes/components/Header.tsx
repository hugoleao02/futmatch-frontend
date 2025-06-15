import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.tsx';
import { styles } from '../styles.ts';

interface HeaderProps {
  isCriador: boolean;
  partidaId: string;
  onCancelarPartida: () => void;
}

export function Header({ isCriador, partidaId, onCancelarPartida }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openCreatorMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleBack = () => {
    window.history.back();
  };

  const handleCreatorMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreatorMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditarPartida = () => {
    handleCreatorMenuClose();
    navigate(ROUTES.MATCH.EDIT.replace(':id', partidaId));
  };

  const handleOpenCancelDialog = () => {
    handleCreatorMenuClose();
    onCancelarPartida();
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={styles.title}>
          Detalhes da Partida
        </Typography>
        {isCriador && (
          <IconButton
            aria-label="more"
            aria-controls="creator-menu"
            aria-haspopup="true"
            onClick={handleCreatorMenuClick}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          id="creator-menu"
          anchorEl={anchorEl}
          open={openCreatorMenu}
          onClose={handleCreatorMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleEditarPartida}>
            <EditIcon sx={{ mr: 1 }} /> Editar Partida
          </MenuItem>
          <MenuItem onClick={handleOpenCancelDialog}>
            <DeleteIcon sx={{ mr: 1 }} /> Cancelar Partida
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
