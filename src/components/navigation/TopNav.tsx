import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  subscribeToPhotoUpdates,
  useProfilePhoto,
} from "../../hooks/useProfilePhoto";

const TopNav: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const {
    photoUrl,
    tempPhotoUrl,
    isLoading: isLoadingPhoto,
    updatePhoto,
    forceUpdate,
  } = useProfilePhoto();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      updatePhoto();
    }
  }, [user]);

  useEffect(() => {
    // Inscreve-se para atualizações de foto
    const unsubscribe = subscribeToPhotoUpdates(() => {
      forceUpdate();
    });

    // Limpa a inscrição quando o componente é desmontado
    return () => {
      unsubscribe();
    };
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/perfil");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        position: "relative",
      }}
    >
      {/* Barra de Pesquisa */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          px: 2,
          py: 1,
          borderRadius: 3,
          flexGrow: 1,
          maxWidth: 600,
          border: "2px solid",
          borderColor: searchFocused ? "primary.main" : "divider",
          boxShadow: searchFocused
            ? "0 4px 20px rgba(0,0,0,0.1)"
            : "0 2px 8px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
        }}
      >
        <SearchIcon
          sx={{
            color: searchFocused ? "primary.main" : "text.secondary",
            transition: "color 0.3s ease",
          }}
        />
        <InputBase
          placeholder="Buscar partidas, jogadores ou salas..."
          sx={{
            ml: 2,
            flex: 1,
            "& input": {
              transition: "all 0.3s ease",
              fontSize: "1rem",
            },
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </Box>

      {/* Botão Criar Partida */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={() => navigate("/criar-sala")}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(40, 167, 69, 0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(40, 167, 69, 0.35)",
          },
        }}
      >
        {t("common.createRoom")}
      </Button>

      {/* Notificações */}
      {user && (
        <Tooltip title="Notificações">
          <IconButton
            sx={{
              color: "text.primary",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "primary.main",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      )}

      {/* Avatar e Menu do Usuário */}
      {user && (
        <>
          <Tooltip title="Menu do Usuário">
            <IconButton
              onClick={handleMenu}
              sx={{
                p: 0,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <Avatar
                src={tempPhotoUrl || photoUrl}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid",
                  borderColor: "primary.main",
                  bgcolor: theme.palette.primary.light,
                  opacity: isLoadingPhoto ? 0.7 : 1,
                  transition: "opacity 0.2s ease",
                }}
              >
                {!tempPhotoUrl &&
                  !photoUrl &&
                  user.nome?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              <Typography>Meu Perfil</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/configuracoes")}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              {t("common.settings")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography>Sair</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default TopNav;
