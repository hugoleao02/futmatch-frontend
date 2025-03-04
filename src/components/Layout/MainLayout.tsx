import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SportsIcon from "@mui/icons-material/Sports";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAuth } from "../../hooks/useAuth";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <SportsSoccerIcon sx={{ mr: 1 }} />
        <Typography variant="h6">FutMatch</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => navigateTo("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t("navigation.home")} />
        </ListItem>
        <ListItem button onClick={() => navigateTo("/partidas")}>
          <ListItemIcon>
            <SportsIcon />
          </ListItemIcon>
          <ListItemText primary={t("navigation.matches")} />
        </ListItem>
        <ListItem button onClick={() => navigateTo("/perfil")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={t("navigation.profile")} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user && (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t("navigation.logout")} />
          </ListItem>
        )}
        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              size="small"
            >
              <MenuItem value="pt-BR">Português</MenuItem>
              <MenuItem value="en-US">English</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <SportsSoccerIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FutMatch
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                {t("navigation.home")}
              </Button>
              <Button color="inherit" component={RouterLink} to="/partidas">
                {t("navigation.matches")}
              </Button>
              <Button color="inherit" component={RouterLink} to="/perfil">
                {t("navigation.profile")}
              </Button>

              {user && (
                <Tooltip title={t("navigation.logout")}>
                  <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    sx={{ ml: 1 }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              )}

              <FormControl sx={{ ml: 2, minWidth: 120 }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  size="small"
                  sx={{ color: "white" }}
                >
                  <MenuItem value="pt-BR">Português</MenuItem>
                  <MenuItem value="en-US">English</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhor desempenho em dispositivos móveis
        }}
      >
        {drawer}
      </Drawer>

      <Container
        component="main"
        sx={{
          mt: { xs: 2, sm: 4 },
          mb: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          flex: 1,
        }}
      >
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: "background.paper" }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} FutMatch - {t("home.subtitle")}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
