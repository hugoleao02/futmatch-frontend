import React, { useState, useEffect } from "react";
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
  CircularProgress,
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
import { useAuth } from "../presentation/hooks/useAuth";
import SportsIcon from "@mui/icons-material/Sports";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { listarPartidasEmAndamento } from "../infrastructure/services/PartidasService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Interface para as partidas em destaque
interface PartidaDestaque {
  id: number;
  title: string;
  location: string;
  time: string;
  players: string;
  level: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [partidasDestaque, setPartidasDestaque] = useState<PartidaDestaque[]>(
    []
  );

  useEffect(() => {
    const carregarPartidasDestaque = async () => {
      try {
        setLoading(true);

        // Buscar partidas em destaque da API
        const partidasData = await listarPartidasEmAndamento();

        const partidasFormatadas = partidasData.slice(0, 3).map((partida) => ({
          id: partida.id,
          title: partida.titulo || "",
          location: partida.local || "",
          time: new Date(partida.dataHora || partida.data).toLocaleString(
            "pt-BR",
            {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          players: `${partida.jogadoresConfirmados?.length || 0}/${
            partida.maxJogadores || 0
          }`,
          level: partida.nivelHabilidade || "",
        }));

        setPartidasDestaque(partidasFormatadas);
      } catch (error) {
        setPartidasDestaque([]);
      } finally {
        setLoading(false);
      }
    };

    carregarPartidasDestaque();
  }, []);

  const features = [
    {
      title: t("home.features.findMatches.title"),
      description: t("home.features.findMatches.description"),
      icon: <SportsIcon fontSize="large" />,
      action: () => navigate("/dashboard/partidas"),
      color: theme.palette.primary.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    },
    {
      title: t("home.features.createRoom.title"),
      description: t("home.features.createRoom.description"),
      icon: <AddCircleIcon fontSize="large" />,
      action: () => navigate("/dashboard/criar-sala"),
      color: theme.palette.secondary.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    },
    {
      title: t("home.features.ranking.title"),
      description: t("home.features.ranking.description"),
      icon: <EmojiEventsIcon fontSize="large" />,
      action: () => navigate("/dashboard/ranking"),
      color: theme.palette.success.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
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
                    onClick={() => navigate("/dashboard/partidas")}
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
                    onClick={() => navigate("/dashboard/criar-sala")}
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
              onClick={() => navigate("/dashboard/partidas")}
              sx={{ fontWeight: "medium" }}
            >
              {t("common.viewAll")}
            </Button>
          </Box>

          <Grid container spacing={3}>
            {loading ? (
              // Mostrar indicador de carregamento
              Array.from(new Array(3)).map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 200,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Paper>
                </Grid>
              ))
            ) : partidasDestaque.length > 0 ? (
              // Mostrar partidas em destaque
              partidasDestaque.map((partida) => (
                <Grid item xs={12} sm={6} key={partida.id}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                    onClick={
                      user
                        ? () => navigate(`/dashboard/partidas/${partida.id}`)
                        : () => navigate("/login")
                    }
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {partida.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {partida.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {partida.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        size="small"
                        label={partida.players}
                        icon={<GroupIcon />}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        label={partida.level}
                        color={
                          partida.level === "AVANCADO"
                            ? "error"
                            : partida.level === "INTERMEDIARIO"
                            ? "warning"
                            : "success"
                        }
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))
            ) : (
              // Mostrar mensagem de erro
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" color="error">
                    {t("home.errorLoadingMatches")}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.reload()}
                  >
                    {t("common.refresh")}
                  </Button>
                </Paper>
              </Grid>
            )}
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
              onClick={() =>
                navigate(user ? "/dashboard/partidas" : "/register")
              }
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
