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
import { useTranslation } from "react-i18next";
import Logo from "../components/common/Logo";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                      p: 3,
                      background: feature.bgColor,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {feature.description}
                    </Typography>

                    <Button
                      variant="text"
                      color="primary"
                      onClick={feature.action}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ mt: 1, fontWeight: "medium" }}
                    >
                      {t("common.learnMore")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Matches Section */}
        <Box sx={{ mb: { xs: 4, sm: 6 } }}>
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
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/partidas")}
            >
              {t("common.viewAll")}
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredMatches.map((match) => (
              <Grid item xs={12} sm={6} key={match.id}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 60,
                      height: 60,
                      mr: { xs: 0, sm: 3 },
                      mb: { xs: 2, sm: 0 },
                    }}
                  >
                    <SportsSoccerIcon sx={{ fontSize: 30 }} />
                  </Avatar>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {match.title}
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2 }}
                      divider={<Divider orientation="vertical" flexItem />}
                      sx={{ mb: 2 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon
                          sx={{
                            fontSize: 18,
                            mr: 0.5,
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {match.location}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {match.time}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {match.players} jogadores
                      </Typography>
                    </Stack>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={match.level}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/partida/${match.id}`)}
                      >
                        {t("common.join")}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backgroundImage:
              "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              {t("home.joinCommunity")}
            </Typography>

            <Typography sx={{ mb: 4, maxWidth: 700, mx: "auto", opacity: 0.9 }}>
              {t("home.joinCommunityText")}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<StarIcon />}
              sx={{
                bgcolor: "white",
                color: theme.palette.secondary.main,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/register")}
            >
              {t("home.getStarted")}
            </Button>
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.1)",
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
