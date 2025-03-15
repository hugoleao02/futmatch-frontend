import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: <HomeIcon />,
      label: t("navigation.home"),
      path: "/",
    },
    {
      icon: <SportsSoccerIcon />,
      label: t("navigation.games"),
      path: "/partidas",
    },
    {
      icon: <GroupIcon />,
      label: t("navigation.rooms"),
      path: "/salas",
    },
    {
      icon: <AddCircleIcon />,
      label: t("navigation.createRoom"),
      path: "/criar-sala",
    },
    {
      icon: <EmojiEventsIcon />,
      label: t("navigation.ranking"),
      path: "/ranking",
    },
    {
      icon: <PersonIcon />,
      label: t("navigation.profile"),
      path: "/perfil",
    },
    {
      icon: <SettingsIcon />,
      label: t("navigation.settings"),
      path: "/configuracoes",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return {
    navigate,
    menuItems,
    isActive,
  };
};
