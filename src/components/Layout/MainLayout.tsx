import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  Container,
  LinearProgress,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../navigation/Sidebar";
import TopNav from "../navigation/TopNav";

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - 280px)` },
          ml: { md: "280px" },
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 4 },
            height: 70,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              color: "primary.main",
              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.dark",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* TopNav */}
          <TopNav />
        </Toolbar>
        {loading && (
          <LinearProgress
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
            }}
          />
        )}
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: 280 },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              bgcolor: "background.paper",
              borderRight: "none",
              boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              bgcolor: "background.paper",
              borderRight: "none",
              boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          bgcolor: "background.default",
          pt: "70px", // Altura do AppBar
          pb: 4,
          px: { xs: 2, sm: 4 },
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            minHeight: "calc(100vh - 70px)", // Altura total menos AppBar
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
