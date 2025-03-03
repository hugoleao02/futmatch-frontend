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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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

  const handleNivelChange = (event: any) => {
    setNivel(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Partidas Disponíveis
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Buscar partidas"
              variant="outlined"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
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

      <Grid container spacing={3}>
        {mockPartidas.map((partida) => (
          <Grid item xs={12} md={6} key={partida.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {partida.titulo}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body2" color="text.secondary">
                    {partida.local}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body2" color="text.secondary">
                    {partida.data} às {partida.hora}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <GroupIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body2" color="text.secondary">
                    {partida.jogadores}/{partida.maxJogadores} jogadores
                  </Typography>
                </Box>
                <Chip
                  label={partida.nivel}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/partida/${partida.id}`)}
                >
                  Participar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Partidas;
