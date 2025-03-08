import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  useTheme,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAuth } from "../../presentation/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TopNav: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
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
        onClick={() => navigate("/dashboard/criar-sala")}
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
        Criar Partida
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
                p: 0.5,
                border: "2px solid",
                borderColor: Boolean(anchorEl) ? "primary.main" : "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Avatar
                src={user.avatar}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {user.nome?.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => navigate("/dashboard/perfil")}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Meu Perfil
            </MenuItem>
            <MenuItem onClick={() => navigate("/dashboard/configuracoes")}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default TopNav;
