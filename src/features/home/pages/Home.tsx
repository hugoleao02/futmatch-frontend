import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../components";
import { useAuth } from "../../../hooks/useAuth";

// Interface para as partidas em destaque
interface PartidaDestaque {
  id: string;
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
  const [error, setError] = useState<string | null>(null);

  const features = [
    {
      title: t("home.features.findMatches.title"),
      description: t("home.features.findMatches.description"),
      icon: <SportsIcon fontSize="large" />,
      action: () => navigate("/partidas"),
      color: theme.palette.primary.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    },
    {
      title: t("home.features.createRoom.title"),
      description: t("home.features.createRoom.description"),
      icon: <AddCircleIcon fontSize="large" />,
      action: () => navigate("/criar-sala"),
      color: theme.palette.secondary.main,
      bgColor: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    },
    {
      title: t("home.features.ranking.title"),
      description: t("home.features.ranking.description"),
      icon: <EmojiEventsIcon fontSize="large" />,
      action: () => navigate("/ranking"),
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
          borderRadius: { xs: 0, sm: "0 0 32px 32px" },
          mb: { xs: 6, sm: 8 },
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <Box
          sx={{
            background: `url('/soccer-stadium-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, rgba(40, 167, 69, 0.95), rgba(27, 126, 49, 0.9))`,
              backdropFilter: "blur(8px)",
            },
            color: "white",
            py: { xs: 8, sm: 10, md: 12 },
            px: { xs: 2, sm: 4 },
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Container maxWidth="md">
            <Logo
              variant={isMobile ? "h3" : "h2"}
              darkMode={true}
              iconSize={isMobile ? 48 : 64}
              sx={{
                justifyContent: "center",
                mb: 4,
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.15)",
                },
              }}
              textSx={{
                textShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />

            <Typography
              variant={isMobile ? "h6" : "h4"}
              component="h2"
              sx={{
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
                fontWeight: 600,
                textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                opacity: 0.95,
              }}
            >
              {t("home.subtitle")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              sx={{ mt: 6 }}
            >
              {user ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<SportsSoccerIcon />}
                    onClick={() => navigate("/partidas")}
                    sx={{
                      px: { xs: 4, sm: 6 },
                      py: 2,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: theme.palette.secondary.main,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(255, 193, 7, 0.3)",
                        background: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    {t("common.startPlaying")}
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<AddCircleIcon />}
                    onClick={() => navigate("/criar-sala")}
                    sx={{
                      px: { xs: 4, sm: 6 },
                      py: 2,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "white",
                      borderColor: "rgba(255,255,255,0.6)",
                      borderWidth: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    {t("home.createMatch")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<LoginIcon />}
                    onClick={() => navigate("/login")}
                    sx={{
                      px: { xs: 4, sm: 6 },
                      py: 2,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: theme.palette.secondary.main,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(255, 193, 7, 0.3)",
                        background: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    {t("auth.login.title")}
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate("/register")}
                    sx={{
                      px: { xs: 4, sm: 6 },
                      py: 2,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "white",
                      borderColor: "rgba(255,255,255,0.6)",
                      borderWidth: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
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
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {t("home.features.title")}
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  background: "white",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    borderColor: "transparent",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mb: 3,
                    background: feature.bgColor,
                    boxShadow: `0 8px 24px ${feature.color}40`,
                  }}
                >
                  {feature.icon}
                </Avatar>

                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {feature.description}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={feature.action}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 2,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: `${feature.color}10`,
                    },
                  }}
                >
                  {t("common.learnMore")}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Matches Section */}
      {user && (
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {t("home.featuredMatches.title")}
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {partidasDestaque.map((partida) => (
                <Grid item xs={12} md={4} key={partida.id}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            mr: 2,
                          }}
                        >
                          <SportsSoccerIcon />
                        </Avatar>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 600 }}
                        >
                          {partida.title}
                        </Typography>
                      </Box>

                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                          }}
                        >
                          <LocationOnIcon
                            sx={{ mr: 1, color: "primary.main" }}
                          />
                          <Typography variant="body2">
                            {partida.location}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                          }}
                        >
                          <AccessTimeIcon
                            sx={{ mr: 1, color: "primary.main" }}
                          />
                          <Typography variant="body2">
                            {partida.time}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                          }}
                        >
                          <GroupIcon sx={{ mr: 1, color: "primary.main" }} />
                          <Typography variant="body2">
                            {partida.players}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                          }}
                        >
                          <StarIcon sx={{ mr: 1, color: "primary.main" }} />
                          <Typography variant="body2">
                            {partida.level}
                          </Typography>
                        </Box>
                      </Stack>

                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/partidas/${partida.id}`)}
                        sx={{
                          mt: 3,
                          borderRadius: 2,
                          py: 1,
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 16px rgba(40, 167, 69, 0.25)",
                          },
                        }}
                      >
                        {t("common.viewDetails")}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </Box>
  );
};

export default Home;
