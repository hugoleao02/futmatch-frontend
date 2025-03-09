import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Avatar,
  Divider,
  Badge,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsIcon from "@mui/icons-material/Sports";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../common/Logo";

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/dashboard",
    },
    {
      text: "Partidas",
      icon: <SportsIcon />,
      path: "/dashboard/partidas",
      badge: 3, // Exemplo de badge para novas partidas
    },
    {
      text: "Salas",
      icon: <SportsSoccerIcon />,
      path: "/dashboard/salas",
    },
    {
      text: "Criar Sala",
      icon: <AddCircleIcon />,
      path: "/dashboard/criar-sala",
    },
    {
      text: "Ranking",
      icon: <EmojiEventsIcon />,
      path: "/dashboard/ranking",
    },
    {
      text: "Meu Perfil",
      icon: <PersonIcon />,
      path: "/dashboard/perfil",
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
              src={user.avatar}
              sx={{
                width: 48,
                height: 48,
                border: "3px solid",
                borderColor: "primary.main",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {user.nome?.charAt(0)}
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
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
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
