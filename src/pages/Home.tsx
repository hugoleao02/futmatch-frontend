import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
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

  const features = [
    {
      title: t("home.features.findMatches.title"),
      description: t("home.features.findMatches.description"),
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/partidas"),
    },
    {
      title: t("home.features.createRoom.title"),
      description: t("home.features.createRoom.description"),
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/criar-sala"),
    },
    {
      title: t("home.features.ranking.title"),
      description: t("home.features.ranking.description"),
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/ranking"),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          mb: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {t("home.title")}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
          {t("home.subtitle")}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<SportsSoccerIcon />}
          onClick={() => navigate("/partidas")}
        >
          {t("common.startPlaying")}
        </Button>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={feature.action}
                >
                  {t("common.startPlaying")}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
