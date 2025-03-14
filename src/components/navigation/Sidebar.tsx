import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SportsIcon from "@mui/icons-material/Sports";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  subscribeToPhotoUpdates,
  useProfilePhoto,
} from "../../hooks/useProfilePhoto";
import Logo from "../common/Logo";

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    photoUrl,
    tempPhotoUrl,
    isLoading: isLoadingPhoto,
    updatePhoto,
    forceUpdate,
  } = useProfilePhoto();

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

  const menuItems = [
    {
      icon: <HomeIcon />,
      label: t("common.home"),
      path: "/",
    },
    {
      icon: <SportsIcon />,
      label: t("common.matches"),
      path: "/partidas",
    },
    {
      icon: <GroupIcon />,
      label: t("common.rooms"),
      path: "/salas",
    },
    {
      icon: <AddCircleIcon />,
      label: t("common.createRoom"),
      path: "/criar-sala",
    },
    {
      icon: <EmojiEventsIcon />,
      label: t("common.ranking"),
      path: "/ranking",
    },
    {
      icon: <PersonIcon />,
      label: t("common.profile"),
      path: "/perfil",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Logo e Título */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('/soccer-field-bg.jpg')",
            backgroundSize: "cover",
            opacity: 0.1,
          },
        }}
      >
        <Logo variant="h5" iconSize={40} darkMode={true} sx={{ mb: 2 }} />
        <Typography
          variant="body2"
          sx={{
            opacity: 0.9,
            mt: 1,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {t("home.subtitle")}
        </Typography>
      </Box>

      {/* Perfil do Usuário */}
      {user && (
        <>
          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              background: "rgba(0,0,0,0.02)",
            }}
          >
            <Avatar
              src={tempPhotoUrl || photoUrl}
              sx={{
                width: 48,
                height: 48,
                border: "3px solid",
                borderColor: "primary.main",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                bgcolor: theme.palette.primary.light,
                opacity: isLoadingPhoto ? 0.7 : 1,
                transition: "opacity 0.2s ease",
              }}
              imgProps={{
                loading: "lazy",
                onError: (e) => {
                  console.error("Erro ao carregar imagem do perfil:", e);
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.onerror = null;
                  imgElement.src = "";
                },
              }}
            >
              {!tempPhotoUrl && !photoUrl && (
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {user.nome?.charAt(0).toUpperCase()}
                </Typography>
              )}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user.nome}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ opacity: 0.8 }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </>
      )}

      {/* Menu de Navegação */}
      <List sx={{ p: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor: isActive(item.path)
                ? `${theme.palette.primary.main}15`
                : "transparent",
              color: isActive(item.path)
                ? theme.palette.primary.main
                : "text.primary",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: `${theme.palette.primary.main}10`,
                transform: "translateX(8px)",
                "& .MuiListItemIcon-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path)
                  ? theme.palette.primary.main
                  : "text.secondary",
                minWidth: 48,
                fontSize: "24px",
                transition: "color 0.3s ease",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 600 : 500,
                fontSize: "1rem",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Versão do App */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          FutMatch v1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
