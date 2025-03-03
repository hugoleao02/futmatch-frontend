import React from "react";
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
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material/Select";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <SportsSoccerIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FutMatch
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            {t("navigation.home")}
          </Button>
          <Button color="inherit" component={RouterLink} to="/partidas">
            {t("navigation.matches")}
          </Button>
          <Button color="inherit" component={RouterLink} to="/perfil">
            {t("navigation.profile")}
          </Button>
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
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
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
