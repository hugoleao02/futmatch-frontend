import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
  Container,
  IconButton,
  Divider,
  Paper,
  Avatar,
  InputAdornment,
  Fade,
  Stack,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

// Dados mockados para o MVP
const mockPartidas = [
  {
    id: 1,
    titulo: "Pelada no Parque",
    local: "Parque da Cidade",
    data: "2024-03-10",
    hora: "15:00",
    jogadores: 8,
    maxJogadores: 10,
    nivel: "Intermediário",
    distancia: "2,5 km",
  },
  {
    id: 2,
    titulo: "Futebol Society",
    local: "Campo Society Central",
    data: "2024-03-11",
    hora: "19:00",
    jogadores: 12,
    maxJogadores: 14,
    nivel: "Avançado",
    distancia: "4,8 km",
  },
  {
    id: 3,
    titulo: "Pelada dos Amigos",
    local: "Quadra Municipal",
    data: "2024-03-12",
    hora: "20:00",
    jogadores: 6,
    maxJogadores: 12,
    nivel: "Iniciante",
    distancia: "1,2 km",
  },
  {
    id: 4,
    titulo: "Futebol de Quinta",
    local: "Arena Soccer Club",
    data: "2024-03-14",
    hora: "21:00",
    jogadores: 10,
    maxJogadores: 14,
    nivel: "Intermediário",
    distancia: "3,7 km",
  },
];

const Partidas: React.FC = () => {
  const navigate = useNavigate();
  const [nivel, setNivel] = useState("");
  const [busca, setBusca] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleNivelChange = (event: any) => {
    setNivel(event.target.value);
  };

  // Função para determinar a cor do chip de nível
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Iniciante":
        return "success";
      case "Intermediário":
        return "primary";
      case "Avançado":
        return "secondary";
      default:
        return "default";
    }
  };

  // Função para calcular a porcentagem de ocupação
  const getOcupacaoPercent = (atual: number, max: number) => {
    return (atual / max) * 100;
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          py: { xs: 4, sm: 5 },
          px: { xs: 2, sm: 3 },
          mb: { xs: 4, sm: 5 },
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 0, sm: "0 0 24px 24px" },
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ mb: { xs: 3, sm: 0 } }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                Partidas Disponíveis
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 500 }}>
                Encontre jogos próximos a você ou crie sua própria partida
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/criar-sala")}
              size={isMobile ? "medium" : "large"}
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: 3,
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              Criar Nova Partida
            </Button>
          </Box>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 180,
            height: 180,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Filtros */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: "white",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={7} md={8}>
              <TextField
                fullWidth
                placeholder="Buscar partidas por nome ou local"
                variant="outlined"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FilterListIcon sx={{ mr: 1, fontSize: 20 }} />
                    Nível
                  </Box>
                </InputLabel>
                <Select
                  value={nivel}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FilterListIcon sx={{ mr: 1, fontSize: 20 }} />
                      Nível
                    </Box>
                  }
                  onChange={handleNivelChange}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">Todos os níveis</MenuItem>
                  <MenuItem value="Iniciante">Iniciante</MenuItem>
                  <MenuItem value="Intermediário">Intermediário</MenuItem>
                  <MenuItem value="Avançado">Avançado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Lista de partidas */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SportsSoccerIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Partidas Próximas
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {mockPartidas.map((partida) => (
            <Grid item xs={12} sm={6} md={6} key={partida.id}>
              <Fade in={true} timeout={500 + partida.id * 100}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                    },
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                      color: "white",
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {partida.titulo}
                    </Typography>
                    <Chip
                      label={partida.nivel}
                      color={getNivelColor(partida.nivel) as any}
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        bgcolor:
                          getNivelColor(partida.nivel) === "success"
                            ? theme.palette.success.main
                            : getNivelColor(partida.nivel) === "secondary"
                            ? theme.palette.secondary.main
                            : theme.palette.primary.dark,
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Stack spacing={2}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: `${theme.palette.primary.light}20`,
                            color: theme.palette.primary.main,
                            width: 36,
                            height: 36,
                            mr: 2,
                          }}
                        >
                          <LocationOnIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Local
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {partida.local}
                          </Typography>
                        </Box>
                        <Chip
                          label={partida.distancia}
                          size="small"
                          variant="outlined"
                          sx={{ ml: "auto" }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: `${theme.palette.primary.light}20`,
                            color: theme.palette.primary.main,
                            width: 36,
                            height: 36,
                            mr: 2,
                          }}
                        >
                          <AccessTimeIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Data e Hora
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {partida.data} às {partida.hora}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: `${theme.palette.primary.light}20`,
                            color: theme.palette.primary.main,
                            width: 36,
                            height: 36,
                            mr: 2,
                          }}
                        >
                          <GroupIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Jogadores
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              variant="body1"
                              fontWeight="medium"
                              sx={{ mr: 1 }}
                            >
                              {partida.jogadores}/{partida.maxJogadores}
                            </Typography>
                            <Box
                              sx={{
                                flexGrow: 1,
                                height: 6,
                                bgcolor: "rgba(0,0,0,0.08)",
                                borderRadius: 3,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${getOcupacaoPercent(
                                    partida.jogadores,
                                    partida.maxJogadores
                                  )}%`,
                                  height: "100%",
                                  bgcolor:
                                    getOcupacaoPercent(
                                      partida.jogadores,
                                      partida.maxJogadores
                                    ) > 80
                                      ? theme.palette.error.main
                                      : getOcupacaoPercent(
                                          partida.jogadores,
                                          partida.maxJogadores
                                        ) > 50
                                      ? theme.palette.warning.main
                                      : theme.palette.success.main,
                                  borderRadius: 3,
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>

                  <Divider />

                  <Box
                    sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={() => navigate(`/partida/${partida.id}`)}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        fontWeight: "bold",
                      }}
                    >
                      Participar
                    </Button>
                  </Box>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {mockPartidas.length === 0 && (
          <Paper
            sx={{
              textAlign: "center",
              py: 6,
              px: 3,
              borderRadius: 3,
              bgcolor: "rgba(0,0,0,0.02)",
              border: "1px dashed rgba(0,0,0,0.1)",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: `${theme.palette.primary.light}30`,
                color: theme.palette.primary.main,
              }}
            >
              <SportsSoccerIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhuma partida encontrada
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
            >
              Não encontramos partidas com os filtros selecionados. Tente outros
              filtros ou crie sua própria partida.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/criar-sala")}
              sx={{
                mt: 2,
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: "bold",
              }}
            >
              Criar Nova Partida
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Partidas;
