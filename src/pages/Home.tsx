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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const features = [
    {
      title: t("home.features.findMatches.title"),
      description: t("home.features.findMatches.description"),
      icon: <LocationOnIcon sx={{ fontSize: isMobile ? 30 : 40 }} />,
      action: () => navigate("/partidas"),
    },
    {
      title: t("home.features.createRoom.title"),
      description: t("home.features.createRoom.description"),
      icon: <GroupIcon sx={{ fontSize: isMobile ? 30 : 40 }} />,
      action: () => navigate("/criar-sala"),
    },
    {
      title: t("home.features.ranking.title"),
      description: t("home.features.ranking.description"),
      icon: <EmojiEventsIcon sx={{ fontSize: isMobile ? 30 : 40 }} />,
      action: () => navigate("/ranking"),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3 },
          mb: { xs: 3, sm: 4, md: 6 },
          textAlign: "center",
          borderRadius: { xs: 0, sm: "0 0 16px 16px" },
        }}
      >
        <Typography
          variant={isMobile ? "h3" : isTablet ? "h2" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: "bold",
          }}
        >
          {t("home.title")}
        </Typography>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h2"
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
        >
          {t("home.subtitle")}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size={isMobile ? "medium" : "large"}
          startIcon={<SportsSoccerIcon />}
          onClick={() => navigate("/partidas")}
          sx={{ px: { xs: 2, sm: 3, md: 4 } }}
        >
          {t("common.startPlaying")}
        </Button>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                  borderRadius: { xs: 2, sm: 3 },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, textAlign: "center", p: { xs: 2, sm: 3 } }}
                >
                  <Box sx={{ color: "primary.main", mb: { xs: 1, sm: 2 } }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant={isMobile ? "h6" : "h5"}
                    component="h2"
                    sx={{ fontWeight: "medium" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: { xs: 1.5, sm: 2 }, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={feature.action}
                    size={isMobile ? "small" : "medium"}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                  >
                    {t("common.startPlaying")}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
