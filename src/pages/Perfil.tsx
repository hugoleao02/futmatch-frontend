import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Skeleton,
  Alert,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

// Dados mockados para complementar os dados do usuário
const mockDadosComplementares = {
  cidade: "São Paulo",
  partidasJogadas: 25,
  partidasOrganizadas: 5,
  avaliacao: 4.5,
  estatisticas: {
    gols: 12,
    assistencias: 8,
    fairPlay: 4.8,
  },
  ultimasPartidas: [
    {
      data: "2024-03-05",
      local: "Campo Society Central",
      resultado: "Vitória",
      avaliacao: 5,
    },
    {
      data: "2024-03-01",
      local: "Parque da Cidade",
      resultado: "Empate",
      avaliacao: 4,
    },
  ],
};

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          {t(
            "profile.notLoggedIn",
            "Você precisa estar logado para ver seu perfil."
          )}
        </Alert>
      </Box>
    );
  }

  // Mapeamento de posições para exibição
  const getPosicaoLabel = (posicao?: string) => {
    if (!posicao) return "Não definida";

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
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              <Chip
                label={getNivel(user.nivelHabilidade)}
                color="primary"
                size="small"
                sx={{ borderRadius: 2 }}
              />
              <Chip
                icon={<LocationOnIcon />}
                label={mockDadosComplementares.cidade}
                size="small"
                sx={{ borderRadius: 2 }}
              />
              {user.isPremium && (
                <Chip
                  icon={<StarIcon />}
                  label="Premium"
                  color="secondary"
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              )}
            </Box>
            <Typography variant="body1" color="text.secondary">
              <strong>Posição preferida:</strong>{" "}
              {getPosicaoLabel(user.posicao)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {t("profile.statistics")}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={t("profile.stats.matchesPlayed")}
                  secondary={mockDadosComplementares.partidasJogadas}
                  secondaryTypographyProps={{
                    color: "primary",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={t("profile.stats.matchesOrganized")}
                  secondary={mockDadosComplementares.partidasOrganizadas}
                  secondaryTypographyProps={{
                    color: "primary",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={t("profile.stats.averageRating")}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {mockDadosComplementares.avaliacao}
                      <StarIcon sx={{ color: "warning.main", ml: 0.5 }} />
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {t("profile.performance")}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={t("profile.stats.goals")}
                  secondary={mockDadosComplementares.estatisticas.gols}
                  secondaryTypographyProps={{
                    color: "primary",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={t("profile.stats.assists")}
                  secondary={mockDadosComplementares.estatisticas.assistencias}
                  secondaryTypographyProps={{
                    color: "primary",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={t("profile.stats.fairPlay")}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {user.pontuacaoFairPlay}
                      <StarIcon sx={{ color: "warning.main", ml: 0.5 }} />
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {t("profile.lastMatches")}
            </Typography>
            <List>
              {mockDadosComplementares.ultimasPartidas.map((partida, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={partida.local}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {partida.data}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <Chip
                              label={partida.resultado}
                              color={
                                partida.resultado === "Vitória"
                                  ? "success"
                                  : partida.resultado === "Derrota"
                                  ? "error"
                                  : "default"
                              }
                              size="small"
                              sx={{ mr: 1, borderRadius: 2 }}
                            />
                            <StarIcon
                              sx={{ color: "warning.main", fontSize: 16 }}
                            />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {partida.avaliacao}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index <
                    mockDadosComplementares.ultimasPartidas.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Perfil;
