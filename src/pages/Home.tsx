import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  Avatar,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTranslation } from "react-i18next";
import Logo from "../components/common/Logo";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();

  const features = [
    {
      title: t("home.features.findMatches.title"),
      description: t("home.features.findMatches.description"),
      icon: <LocationOnIcon sx={{ fontSize: isMobile ? 30 : 40 }} />,
      action: () => navigate("/partidas"),
      color: theme.palette.primary.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    },
    {
      title: t("home.features.createRoom.title"),
      description: t("home.features.createRoom.description"),
      icon: <GroupIcon sx={{ fontSize: isMobile ? 30 : 40 }} />,
      action: () => navigate("/criar-sala"),
      color: theme.palette.secondary.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    },
    {
      title: t("home.features.ranking.title"),
      description: t("home.features.ranking.description"),
      icon: <EmojiEventsIcon sx={{ fontSize: isMobile ? 30 : 40 }} />,
      action: () => navigate("/ranking"),
      color: theme.palette.success.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
    },
  ];

  // Partidas em destaque (mockadas)
  const featuredMatches = [
    {
      id: 1,
      title: "Pelada no Parque",
      location: "Parque da Cidade",
      time: "Hoje, 15:00",
      players: "8/10",
      level: "Intermediário",
    },
    {
      id: 2,
      title: "Futebol Society",
      location: "Campo Society Central",
      time: "Amanhã, 19:00",
      players: "12/14",
      level: "Avançado",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 0, sm: "0 0 24px 24px" },
          mb: { xs: 6, sm: 8 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            backgroundImage:
              "linear-gradient(135deg, #1976D2 0%, #2196F3 100%)",
            color: "white",
            py: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 4 },
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container maxWidth="md">
            <Logo
              variant={isMobile ? "h3" : "h2"}
              darkMode={true}
              iconSize={isMobile ? 40 : 56}
              sx={{
                justifyContent: "center",
                mb: 3,
              }}
              textSx={{
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />

            <Typography
              variant={isMobile ? "body1" : "h6"}
              component="h2"
              sx={{
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.9,
              }}
            >
              {t("home.subtitle")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              {user ? (
                // Botões para usuários autenticados
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size={isMobile ? "medium" : "large"}
                    startIcon={<SportsSoccerIcon />}
                    onClick={() => navigate("/partidas")}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: 3,
                      fontWeight: "bold",
                    }}
                  >
                    {t("common.startPlaying")}
                  </Button>

                  <Button
                    variant="outlined"
                    size={isMobile ? "medium" : "large"}
                    onClick={() => navigate("/criar-sala")}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: 3,
                      fontWeight: "bold",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.5)",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {t("home.createMatch")}
                  </Button>
                </>
              ) : (
                // Botões para usuários não autenticados
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size={isMobile ? "medium" : "large"}
                    startIcon={<LoginIcon />}
                    onClick={() => navigate("/login")}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: 3,
                      fontWeight: "bold",
                    }}
                  >
                    {t("auth.login.title")}
                  </Button>

                  <Button
                    variant="outlined"
                    size={isMobile ? "medium" : "large"}
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate("/register")}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: 3,
                      fontWeight: "bold",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.5)",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {t("auth.register.title")}
                  </Button>
                </>
              )}
            </Stack>
          </Container>
        </Box>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>

      <Container maxWidth="lg">
        {/* Features Section */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 4,
              fontWeight: "bold",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 4,
                bgcolor: "primary.main",
                borderRadius: 2,
              },
            }}
          >
            {t("home.featuresTitle")}
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[10],
                    },
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      background: feature.bgColor,
                      color: "white",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        width: 50,
                        height: 50,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ ml: 2, fontWeight: "bold" }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="text"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      onClick={user ? feature.action : () => navigate("/login")}
                      sx={{ fontWeight: "medium" }}
                    >
                      {user ? t("common.learnMore") : t("auth.login.title")}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Matches Section */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              {t("home.featuredMatches")}
            </Typography>
            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/partidas")}
              sx={{ fontWeight: "medium" }}
            >
              {t("common.viewAll")}
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredMatches.map((match) => (
              <Grid item xs={12} sm={6} key={match.id}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: "bold", mb: 0.5 }}
                      >
                        {match.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "primary.main" }}
                        />
                        <Typography variant="body2">
                          {match.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={match.level}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {match.time}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <GroupIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "primary.main" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {match.players}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={
                        user
                          ? () => navigate(`/partidas/${match.id}`)
                          : () => navigate("/login")
                      }
                      sx={{ borderRadius: 2 }}
                    >
                      {user ? t("common.join") : t("auth.login.title")}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Join Community Section */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Paper
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: "white",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.1)",
                display: { xs: "none", md: "block" },
              }}
            />

            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", position: "relative", zIndex: 1 }}
            >
              {t("home.joinCommunity")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, maxWidth: 700, mx: "auto", opacity: 0.9 }}
            >
              {t("home.joinCommunityText")}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate(user ? "/partidas" : "/register")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                boxShadow: theme.shadows[5],
              }}
            >
              {user ? t("common.startPlaying") : t("home.getStarted")}
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
