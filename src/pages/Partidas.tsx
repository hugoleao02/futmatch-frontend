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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

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

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          gutterBottom={isMobile}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Partidas Disponíveis
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/criar-sala")}
          size={isMobile ? "small" : "medium"}
          sx={{ mb: { xs: 2, sm: 0 } }}
        >
          Criar Nova Partida
        </Button>
      </Box>

      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                label="Buscar partidas"
                variant="outlined"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                size={isMobile ? "small" : "medium"}
              />
              <IconButton color="primary" sx={{ ml: 1 }} aria-label="buscar">
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <FormControl fullWidth size={isMobile ? "small" : "medium"}>
              <InputLabel>Nível</InputLabel>
              <Select value={nivel} label="Nível" onChange={handleNivelChange}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Iniciante">Iniciante</MenuItem>
                <MenuItem value="Intermediário">Intermediário</MenuItem>
                <MenuItem value="Avançado">Avançado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {mockPartidas.map((partida) => (
          <Grid item xs={12} sm={6} key={partida.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[6],
                },
                borderRadius: { xs: 2, sm: 2 },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  gutterBottom
                  sx={{ fontWeight: "medium" }}
                >
                  {partida.titulo}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOnIcon
                    sx={{
                      mr: 1,
                      color: "primary.main",
                      fontSize: isMobile ? 18 : 20,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {partida.local}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon
                    sx={{
                      mr: 1,
                      color: "primary.main",
                      fontSize: isMobile ? 18 : 20,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {partida.data} às {partida.hora}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <GroupIcon
                    sx={{
                      mr: 1,
                      color: "primary.main",
                      fontSize: isMobile ? 18 : 20,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {partida.jogadores}/{partida.maxJogadores} jogadores
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Chip label={partida.nivel} color="primary" size="small" />

                  <Button
                    variant="contained"
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                    onClick={() => navigate(`/partida/${partida.id}`)}
                  >
                    Participar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {mockPartidas.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhuma partida encontrada
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/criar-sala")}
            sx={{ mt: 2 }}
          >
            Criar Nova Partida
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Partidas;
