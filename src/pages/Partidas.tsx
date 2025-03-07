import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
  SelectChangeEvent,
  Tabs,
  Tab,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslation } from "react-i18next";
import {
  Partida,
  FiltroPartidaDTO,
  listarPartidas,
} from "../infrastructure/services";

// Definindo interfaces para os tipos necessários
interface PartidaUI {
  id: string;
  titulo: string;
  local: string;
  dataHora: string;
  maxJogadores: number;
  nivelHabilidade: string;
  jogadoresConfirmados: Array<{
    id: string;
    nome: string;
    posicao?: string;
    avatar?: string;
  }>;
  jogadoresEspera: Array<{
    id: string;
    nome: string;
    posicao?: string;
    avatar?: string;
  }>;
}

interface FiltroPartida {
  nivelHabilidade: string;
  busca: string;
}

// Dados mockados das partidas
const mockMatches = [
  {
    id: 1,
    title: "Pelada dos Amigos",
    date: "2024-03-20T19:00:00",
    location: "Arena Soccer Club",
    address: "Rua das Palmeiras, 123",
    maxPlayers: 14,
    currentPlayers: 10,
    price: 25.0,
    status: "open",
    organizer: {
      name: "João Silva",
      avatar: "",
    },
    players: [
      { name: "João Silva", position: "Atacante", avatar: "" },
      { name: "Pedro Santos", position: "Meio-Campo", avatar: "" },
      { name: "Carlos Oliveira", position: "Zagueiro", avatar: "" },
    ],
  },
  {
    id: 2,
    title: "Futebol Society",
    date: "2024-03-21T20:00:00",
    location: "Soccer House",
    address: "Av. Principal, 456",
    maxPlayers: 12,
    currentPlayers: 12,
    price: 30.0,
    status: "full",
    organizer: {
      name: "Pedro Santos",
      avatar: "",
    },
    players: [
      { name: "Pedro Santos", position: "Meio-Campo", avatar: "" },
      { name: "Lucas Mendes", position: "Goleiro", avatar: "" },
      { name: "Rafael Costa", position: "Atacante", avatar: "" },
    ],
  },
  {
    id: 3,
    title: "Rachão de Quinta",
    date: "2024-03-22T18:30:00",
    location: "Clube Atlético",
    address: "Rua do Esporte, 789",
    maxPlayers: 10,
    currentPlayers: 6,
    price: 20.0,
    status: "open",
    organizer: {
      name: "Lucas Mendes",
      avatar: "",
    },
    players: [
      { name: "Lucas Mendes", position: "Goleiro", avatar: "" },
      { name: "João Silva", position: "Atacante", avatar: "" },
      { name: "Carlos Oliveira", position: "Zagueiro", avatar: "" },
    ],
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`matches-tabpanel-${index}`}
      aria-labelledby={`matches-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Partidas: React.FC = () => {
  const navigate = useNavigate();
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltroPartidaDTO>({
    nivelHabilidade: "",
    busca: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    carregarPartidas();
  }, []);

  const carregarPartidas = async () => {
    try {
      setLoading(true);
      const data = await listarPartidas();
      setPartidas(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar partidas"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNivelChange = (event: SelectChangeEvent) => {
    setFiltros({
      ...filtros,
      nivelHabilidade: event.target.value,
    });
    aplicarFiltros({
      ...filtros,
      nivelHabilidade: event.target.value,
    });
  };

  const handleBuscaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({
      ...filtros,
      busca: event.target.value,
    });
  };

  const aplicarFiltros = async (filtrosAtualizados: FiltroPartidaDTO) => {
    try {
      setLoading(true);
      const data = await listarPartidas(filtrosAtualizados);
      setPartidas(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao filtrar partidas");
    } finally {
      setLoading(false);
    }
  };

  // Função para determinar a cor do chip de nível
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "INICIANTE":
        return "success";
      case "INTERMEDIARIO":
        return "primary";
      case "AVANCADO":
        return "secondary";
      default:
        return "default";
    }
  };

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case "INICIANTE":
        return "Iniciante";
      case "INTERMEDIARIO":
        return "Intermediário";
      case "AVANCADO":
        return "Avançado";
      default:
        return nivel;
    }
  };

  // Função para calcular a porcentagem de ocupação
  const getOcupacaoPercent = (atual: number, max: number) => {
    return (atual / max) * 100;
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatarHora = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
              onClick={() => navigate("/dashboard/criar-partida")}
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
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="matches tabs"
            variant="fullWidth"
          >
            <Tab
              icon={<SportsSoccerIcon />}
              label="Todas as Partidas"
              id="matches-tab-0"
            />
            <Tab
              icon={<GroupIcon />}
              label="Minhas Partidas"
              id="matches-tab-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
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
                  placeholder={t("matches.search")}
                  variant="outlined"
                  value={filtros.busca}
                  onChange={handleBuscaChange}
                  onKeyPress={(e) =>
                    e.key === "Enter" && aplicarFiltros(filtros)
                  }
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
                    value={filtros.nivelHabilidade}
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
                    <MenuItem value="INICIANTE">Iniciante</MenuItem>
                    <MenuItem value="INTERMEDIARIO">Intermediário</MenuItem>
                    <MenuItem value="AVANCADO">Avançado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Estado de carregamento */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Mensagem de erro */}
          {error && !loading && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Lista de partidas */}
          {!loading && !error && (
            <>
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
                <SportsSoccerIcon
                  sx={{ mr: 1, color: theme.palette.primary.main }}
                />
                Partidas Próximas
              </Typography>

              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {partidas.map((partida, index) => (
                  <Grid item xs={12} sm={6} md={6} key={partida.id}>
                    <Fade in={true} timeout={500 + index * 100}>
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
                            label={getNivelLabel(partida.nivelHabilidade || "")}
                            color={
                              getNivelColor(
                                partida.nivelHabilidade || ""
                              ) as any
                            }
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              color: "white",
                              bgcolor:
                                getNivelColor(partida.nivelHabilidade || "") ===
                                "success"
                                  ? theme.palette.success.main
                                  : getNivelColor(
                                      partida.nivelHabilidade || ""
                                    ) === "secondary"
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Local
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {partida.local}
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
                                <AccessTimeIcon />
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Data e Hora
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formatarData(partida.dataHora || "")} às{" "}
                                  {formatarHora(partida.dataHora || "")}
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Jogadores
                                </Typography>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Typography
                                    variant="body1"
                                    fontWeight="medium"
                                    sx={{ mr: 1 }}
                                  >
                                    {partida.jogadoresConfirmados?.length || 0}/
                                    {partida.maxJogadores || 0}
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
                                          partida.jogadoresConfirmados
                                            ?.length || 0,
                                          partida.maxJogadores || 0
                                        )}%`,
                                        height: "100%",
                                        bgcolor:
                                          getOcupacaoPercent(
                                            partida.jogadoresConfirmados
                                              ?.length || 0,
                                            partida.maxJogadores || 0
                                          ) > 80
                                            ? theme.palette.error.main
                                            : getOcupacaoPercent(
                                                partida.jogadoresConfirmados
                                                  ?.length || 0,
                                                partida.maxJogadores || 0
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

                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={() =>
                              navigate(`/dashboard/partidas/${partida.id}`)
                            }
                            sx={{
                              borderRadius: 2,
                              px: 3,
                              fontWeight: "bold",
                            }}
                          >
                            Participar
                          </Button>
                        </CardActions>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>

              {partidas.length === 0 && !loading && (
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
                    Não encontramos partidas com os filtros selecionados. Tente
                    outros filtros ou crie sua própria partida.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/dashboard/criar-partida")}
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
            </>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {mockMatches
              .filter((_, index) => index === 0)
              .map((match) => (
                <Grid item xs={12} md={6} lg={4} key={match.id}>
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
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
                          {match.title}
                        </Typography>
                        <Chip
                          label={getStatusText(match.status)}
                          color={getStatusColor(match.status) as any}
                          size="small"
                        />
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(match.date)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Box>
                          <Typography variant="body2">
                            {match.location}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {match.address}
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
                            {match.currentPlayers}/{match.maxPlayers} jogadores
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "bold", color: "success.main" }}
                        >
                          R$ {match.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        color="error"
                        onClick={() => {
                          // Lógica para cancelar participação
                        }}
                      >
                        Cancelar Participação
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>
      </Container>

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
          onClick={() => navigate("/dashboard/criar-partida")}
          sx={{
            borderRadius: 8,
            px: 4,
            py: 1.5,
            boxShadow: theme.shadows[8],
          }}
        >
          Criar Partida
        </Button>
      </Box>
    </Box>
  );
};

export default Partidas;
