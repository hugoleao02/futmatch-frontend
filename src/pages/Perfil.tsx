import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import AssistantIcon from "@mui/icons-material/Assistant";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../presentation/hooks/useAuth";
import { useTranslation } from "react-i18next";
import {
  PerfilService,
  Estatisticas,
  AtualizarPerfilDTO,
} from "../infrastructure/services";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const carregarEstatisticas = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await PerfilService.obterEstatisticas();
        setEstatisticas(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Erro ao carregar estatísticas"
        );
      } finally {
        setLoading(false);
      }
    };

    carregarEstatisticas();
  }, [user]);

  const handleSubmit = async (values: AtualizarPerfilDTO) => {
    try {
      setSubmitting(true);
      await PerfilService.atualizarPerfil(values);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao atualizar perfil"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        {t("profile.notLoggedIn")}
      </Alert>
    );
  }

  // Função para obter o label da posição
  const getPosicaoLabel = (posicao?: string) => {
    if (!posicao) return "Não informada";

    const posicoes: Record<string, string> = {
      GOLEIRO: "Goleiro",
      ZAGUEIRO: "Zagueiro",
      LATERAL: "Lateral",
      VOLANTE: "Volante",
      MEIA: "Meia",
      ATACANTE: "Atacante",
    };

    return posicoes[posicao] || posicao;
  };

  // Nível baseado na pontuação
  const getNivel = (nivelHabilidade: number) => {
    if (nivelHabilidade < 3) return "Iniciante";
    if (nivelHabilidade < 7) return "Intermediário";
    return "Avançado";
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                bgcolor: "primary.main",
                boxShadow: 2,
              }}
            >
              <Typography variant="h4">
                {user.apelido.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {user.apelido}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <Chip
                icon={<PersonIcon />}
                label={getPosicaoLabel(user.posicao)}
                size="small"
                sx={{ borderRadius: 2 }}
              />
              <Chip
                icon={<LocationOnIcon />}
                label={estatisticas?.cidade || "Não informada"}
                size="small"
                sx={{ borderRadius: 2 }}
              />
              <Chip
                icon={<StarIcon />}
                label={getNivel(user.nivelHabilidade)}
                color="primary"
                size="small"
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {t("profile.stats.title")}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SportsSoccerIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("profile.stats.matchesPlayed")}
                    secondary={estatisticas?.totalPartidas || 0}
                    secondaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEventsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("profile.stats.matchesOrganized")}
                    secondary={estatisticas?.partidasOrganizadas || 0}
                    secondaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("profile.stats.rating")}
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {estatisticas?.mediaAvaliacao || 0}
                        <StarIcon sx={{ color: "warning.main", ml: 0.5 }} />
                      </Box>
                    }
                    secondaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {t("profile.stats.performance")}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SportsSoccerIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("profile.stats.goals")}
                    secondary={estatisticas?.gols || 0}
                    secondaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssistantIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("profile.stats.assists")}
                    secondary={estatisticas?.assistencias || 0}
                    secondaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ThumbUpIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("profile.stats.fairPlay")}
                    secondary={estatisticas?.fairPlayScore || 0}
                    secondaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {t("profile.recentMatches")}
              </Typography>
              <List>
                {estatisticas?.ultimasPartidas &&
                estatisticas.ultimasPartidas.length > 0 ? (
                  estatisticas.ultimasPartidas.map((partida, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <SportsSoccerIcon
                            color={
                              partida.resultado === "Vitória"
                                ? "success"
                                : partida.resultado === "Derrota"
                                ? "error"
                                : "info"
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${partida.local} - ${new Date(
                            partida.data
                          ).toLocaleDateString()}`}
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="body2"
                                color={
                                  partida.resultado === "Vitória"
                                    ? "success.main"
                                    : partida.resultado === "Derrota"
                                    ? "error.main"
                                    : "info.main"
                                }
                                fontWeight="bold"
                              >
                                {partida.resultado}
                              </Typography>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                {partida.avaliacao}
                                <StarIcon
                                  sx={{
                                    color: "warning.main",
                                    ml: 0.5,
                                    fontSize: 16,
                                  }}
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < estatisticas.ultimasPartidas.length - 1 && (
                        <Divider />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText
                      primary={t("profile.noRecentMatches")}
                      primaryTypographyProps={{ color: "text.secondary" }}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Perfil;
