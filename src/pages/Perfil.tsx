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
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Dados mockados para o MVP
const mockPerfil = {
  nome: "João Silva",
  nivel: "Intermediário",
  partidasJogadas: 25,
  partidasOrganizadas: 5,
  avaliacao: 4.5,
  cidade: "São Paulo",
  posicaoPreferida: "Meia",
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
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                bgcolor: "primary.main",
              }}
            >
              <Typography variant="h4">{mockPerfil.nome.charAt(0)}</Typography>
            </Avatar>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {mockPerfil.nome}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip label={mockPerfil.nivel} color="primary" size="small" />
              <Chip
                icon={<LocationOnIcon />}
                label={mockPerfil.cidade}
                size="small"
              />
            </Box>
            <Typography variant="body1" color="text.secondary">
              Posição preferida: {mockPerfil.posicaoPreferida}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Estatísticas
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Partidas Jogadas"
                  secondary={mockPerfil.partidasJogadas}
                  secondaryTypographyProps={{ color: "primary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Partidas Organizadas"
                  secondary={mockPerfil.partidasOrganizadas}
                  secondaryTypographyProps={{ color: "primary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Avaliação Média"
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {mockPerfil.avaliacao}
                      <StarIcon sx={{ color: "warning.main", ml: 0.5 }} />
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Desempenho
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Gols"
                  secondary={mockPerfil.estatisticas.gols}
                  secondaryTypographyProps={{ color: "primary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Assistências"
                  secondary={mockPerfil.estatisticas.assistencias}
                  secondaryTypographyProps={{ color: "primary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Fair Play"
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {mockPerfil.estatisticas.fairPlay}
                      <StarIcon sx={{ color: "warning.main", ml: 0.5 }} />
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Últimas Partidas
            </Typography>
            <List>
              {mockPerfil.ultimasPartidas.map((partida, index) => (
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
                                  : "default"
                              }
                              size="small"
                              sx={{ mr: 1 }}
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
                  {index < mockPerfil.ultimasPartidas.length - 1 && <Divider />}
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
