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
  Avatar,
  Badge,
  Paper,
  InputBase,
  alpha,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SportsIcon from "@mui/icons-material/Sports";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../common/Logo";
import LogoutDialog from "../common/LogoutDialog";
import { useSnackbar } from "notistack";
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setLogoutDialogOpen(false);
    if (isMobile) {
      setDrawerOpen(false);
    }
    enqueueSnackbar(t("auth.logout.success"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => navigateTo("/")}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 2,
            bgcolor: theme.palette.secondary.main,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <SportsSoccerIcon sx={{ fontSize: 36 }} />
        </Avatar>
        <Logo
          variant="h6"
          darkMode={true}
          showIcon={false}
          textSx={{ mb: 1 }}
        />
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
          {t("home.subtitle")}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        <ListItem
          button
          onClick={() => navigateTo("/partidas")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor: isActive("/partidas")
              ? alpha(theme.palette.primary.main, 0.1)
              : "transparent",
            color: isActive("/partidas")
              ? theme.palette.primary.main
              : "inherit",
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: isActive("/partidas")
                ? theme.palette.primary.main
                : "inherit",
            }}
          >
            <SportsIcon />
          </ListItemIcon>
          <ListItemText primary={t("navigation.matches")} />
        </ListItem>

        {user && (
          <>
            <ListItem
              button
              onClick={() => navigateTo("/perfil")}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive("/perfil")
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
                color: isActive("/perfil")
                  ? theme.palette.primary.main
                  : "inherit",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive("/perfil")
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t("navigation.profile")} />
            </ListItem>

            <ListItem
              button
              onClick={() => navigateTo("/criar-sala")}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive("/criar-sala")
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
                color: isActive("/criar-sala")
                  ? theme.palette.primary.main
                  : "inherit",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive("/criar-sala")
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              >
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={t("navigation.createRoom")} />
            </ListItem>
          </>
        )}

        {!user && (
          <>
            <ListItem
              button
              onClick={() => navigateTo("/login")}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive("/login")
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
                color: isActive("/login")
                  ? theme.palette.primary.main
                  : "inherit",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive("/login")
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              >
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={t("auth.login.title")} />
            </ListItem>

            <ListItem
              button
              onClick={() => navigateTo("/register")}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive("/register")
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
                color: isActive("/register")
                  ? theme.palette.primary.main
                  : "inherit",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive("/register")
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              >
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={t("auth.register.title")} />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {user && (
          <ListItem
            button
            onClick={handleLogoutClick}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                bgcolor: alpha(theme.palette.error.main, 0.05),
                color: theme.palette.error.main,
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t("navigation.logout")} />
          </ListItem>
        )}
        <ListItem sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              size="small"
              variant="outlined"
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigateTo("/")}
          >
            <Logo variant="h6" darkMode={true} iconSize={28} />
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", mx: 2, flexGrow: 1, maxWidth: 500 }}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 8,
                  bgcolor: alpha("#fff", 0.15),
                  "&:hover": {
                    bgcolor: alpha("#fff", 0.25),
                  },
                }}
              >
                <IconButton
                  sx={{ p: "10px", color: "white" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, color: "white" }}
                  placeholder={t("common.searchPlaceholder")}
                  inputProps={{ "aria-label": "search" }}
                />
              </Paper>
            </Box>
          )}

          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{
                  mx: 1,
                  opacity: isActive("/") ? 1 : 0.8,
                  fontWeight: isActive("/") ? "bold" : "medium",
                  "&:hover": { opacity: 1 },
                }}
              >
                {t("navigation.home")}
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/partidas"
                sx={{
                  mx: 1,
                  opacity: isActive("/partidas") ? 1 : 0.8,
                  fontWeight: isActive("/partidas") ? "bold" : "medium",
                  "&:hover": { opacity: 1 },
                }}
              >
                {t("navigation.matches")}
              </Button>

              {user && (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/perfil"
                    sx={{
                      mx: 1,
                      opacity: isActive("/perfil") ? 1 : 0.8,
                      fontWeight: isActive("/perfil") ? "bold" : "medium",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {t("navigation.profile")}
                  </Button>

                  <Tooltip title={t("navigation.notifications")}>
                    <IconButton color="inherit" sx={{ ml: 1 }}>
                      <Badge badgeContent={3} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("navigation.logout")}>
                    <IconButton
                      color="inherit"
                      onClick={handleLogoutClick}
                      sx={{ ml: 1 }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {!user && (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    sx={{
                      mx: 1,
                      opacity: isActive("/login") ? 1 : 0.8,
                      fontWeight: isActive("/login") ? "bold" : "medium",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {t("auth.login.title")}
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      mx: 1,
                      opacity: isActive("/register") ? 1 : 0.8,
                      fontWeight: isActive("/register") ? "bold" : "medium",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {t("auth.register.title")}
                  </Button>
                </>
              )}

              <FormControl sx={{ ml: 2, minWidth: 120 }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  size="small"
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#fff", 0.3),
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#fff", 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#fff", 0.7),
                    },
                  }}
                >
                  <MenuItem value="pt-BR">Português</MenuItem>
                  <MenuItem value="en-US">English</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/partidas"
                sx={{
                  mx: 1,
                  opacity: isActive("/partidas") ? 1 : 0.8,
                  fontWeight: isActive("/partidas") ? "bold" : "medium",
                  "&:hover": { opacity: 1 },
                }}
              >
                {t("navigation.matches")}
              </Button>

              {user ? (
                // Botões para usuários autenticados
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/perfil"
                    sx={{
                      mx: 1,
                      opacity: isActive("/perfil") ? 1 : 0.8,
                      fontWeight: isActive("/perfil") ? "bold" : "medium",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {t("navigation.profile")}
                  </Button>

                  <Tooltip title={t("navigation.notifications")}>
                    <IconButton color="inherit" sx={{ ml: 1 }}>
                      <Badge badgeContent={3} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("navigation.logout")}>
                    <IconButton
                      color="inherit"
                      onClick={handleLogoutClick}
                      sx={{ ml: 1 }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                // Botões para usuários não autenticados
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    sx={{
                      mx: 1,
                      opacity: isActive("/login") ? 1 : 0.8,
                      fontWeight: isActive("/login") ? "bold" : "medium",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {t("auth.login.title")}
                  </Button>

                  <Button
                    variant="outlined"
                    color="inherit"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      mx: 1,
                      borderRadius: 2,
                      borderColor: alpha("#fff", 0.5),
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: alpha("#fff", 0.1),
                      },
                    }}
                  >
                    {t("auth.register.title")}
                  </Button>
                </>
              )}

              <FormControl sx={{ ml: 2, minWidth: 120 }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  size="small"
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#fff", 0.3),
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#fff", 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha("#fff", 0.7),
                    },
                  }}
                >
                  <MenuItem value="pt-BR">Português</MenuItem>
                  <MenuItem value="en-US">English</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          mt: { xs: 3, sm: 5 },
          mb: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3, md: 4 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          bgcolor: "white",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 2, sm: 0 },
              }}
            >
              <Logo variant="h6" iconSize={24} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t("footer.copyright")}
            </Typography>
          </Box>
        </Container>
      </Box>

      <LogoutDialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogout}
        username={user?.apelido}
      />
    </Box>
  );
};

export default MainLayout;
