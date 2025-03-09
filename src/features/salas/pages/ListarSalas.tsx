import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";

// Mock das salas
const mockRooms = [
  {
    id: 1,
    title: "Pelada dos Amigos",
    date: "2024-03-20T19:00:00",
    location: "Arena Soccer Club",
    address: "Rua das Palmeiras, 123",
    maxPlayers: 14,
    currentPlayers: 10,
    gameType: "society",
    skillLevel: "casual",
    status: "open",
    organizer: {
      id: 1,
      name: "João Silva",
      avatar: "",
    },
  },
  {
    id: 2,
    title: "Futebol Society",
    date: "2024-03-21T20:00:00",
    location: "Soccer House",
    address: "Av. Principal, 456",
    maxPlayers: 12,
    currentPlayers: 12,
    gameType: "society",
    skillLevel: "intermediario",
    status: "full",
    organizer: {
      id: 2,
      name: "Pedro Santos",
      avatar: "",
    },
  },
  {
    id: 3,
    title: "Rachão de Quinta",
    date: "2024-03-22T18:30:00",
    location: "Clube Atlético",
    address: "Rua do Esporte, 789",
    maxPlayers: 10,
    currentPlayers: 6,
    gameType: "futsal",
    skillLevel: "casual",
    status: "open",
    organizer: {
      id: 3,
      name: "Lucas Mendes",
      avatar: "",
    },
  },
];

const ListarSalas: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gameType: "all",
    skillLevel: "all",
    status: "all",
  });

  const handleFilterChange =
    (field: keyof typeof filters) => (event: SelectChangeEvent) => {
      setFilters({
        ...filters,
        [field]: event.target.value,
      });
    };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "success";
      case "full":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Vagas Disponíveis";
      case "full":
        return "Lotado";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      search === "" ||
      room.title.toLowerCase().includes(search.toLowerCase()) ||
      room.location.toLowerCase().includes(search.toLowerCase());

    const matchesGameType =
      filters.gameType === "all" || room.gameType === filters.gameType;

    const matchesSkillLevel =
      filters.skillLevel === "all" || room.skillLevel === filters.skillLevel;

    const matchesStatus =
      filters.status === "all" || room.status === filters.status;

    return (
      matchesSearch && matchesGameType && matchesSkillLevel && matchesStatus
    );
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Salas Disponíveis
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          Encontre uma sala para jogar ou crie a sua própria
        </Typography>
      </Box>

      {/* Filtros */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Buscar salas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Jogo</InputLabel>
                <Select
                  value={filters.gameType}
                  onChange={handleFilterChange("gameType")}
                  label="Tipo de Jogo"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="society">Society</MenuItem>
                  <MenuItem value="campo">Campo</MenuItem>
                  <MenuItem value="futsal">Futsal</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Nível</InputLabel>
                <Select
                  value={filters.skillLevel}
                  onChange={handleFilterChange("skillLevel")}
                  label="Nível"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="intermediario">Intermediário</MenuItem>
                  <MenuItem value="competitivo">Competitivo</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={handleFilterChange("status")}
                  label="Status"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="open">Vagas Disponíveis</MenuItem>
                  <MenuItem value="full">Lotado</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Salas */}
      <Grid container spacing={3}>
        {filteredRooms.map((room) => (
          <Grid item xs={12} md={6} lg={4} key={room.id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {room.title}
                  </Typography>
                  <Chip
                    label={getStatusText(room.status)}
                    color={getStatusColor(room.status) as any}
                    size="small"
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(room.date)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Box>
                    <Typography variant="body2">{room.location}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {room.address}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GroupIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2">
                      {room.currentPlayers}/{room.maxPlayers} jogadores
                    </Typography>
                  </Box>
                  <Chip
                    label={
                      room.skillLevel === "casual"
                        ? "Casual"
                        : room.skillLevel === "intermediario"
                        ? "Intermediário"
                        : "Competitivo"
                    }
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={room.organizer.avatar}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  >
                    {room.organizer.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    Organizado por {room.organizer.name}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/dashboard/salas/${room.id}`)}
                  disabled={room.status === "full"}
                >
                  {room.status === "full" ? "Sala Lotada" : "Ver Detalhes"}
                </Button>
                <IconButton
                  color="success"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    window.open(
                      `https://wa.me/?text=Olá! Vi sua sala "${room.title}" no FutMatch e gostaria de participar!`,
                      "_blank"
                    );
                  }}
                >
                  <WhatsAppIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<SportsSoccerIcon />}
          onClick={() => navigate("/dashboard/criar-sala")}
          sx={{
            borderRadius: 8,
            px: 4,
            py: 1.5,
            boxShadow: theme.shadows[8],
          }}
        >
          Criar Sala
        </Button>
      </Box>
    </Container>
  );
};

export default ListarSalas;
