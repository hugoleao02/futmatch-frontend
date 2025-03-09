import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Fade,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiltroPartidaDTO, Partida } from "../../../@types";

interface ListarPartidasParams extends FiltroPartidaDTO {
  busca?: string;
}

interface FiltrosState {
  nivelHabilidade: string;
  busca: string;
}

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const LoadingComponent = () => (
  <Grid item xs={12} textAlign="center">
    <CircularProgress />
  </Grid>
);

const EmptyStateMessage = ({ message }: { message: string }) => (
  <Grid item xs={12}>
    <Paper sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Paper>
  </Grid>
);

const PARTIDAS_MOCK: Partida[] = [
  {
    id: 1,
    titulo: "Pelada de Domingo",
    local: "Campo do São Paulo FC",
    data: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    dataHora: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    nivelHabilidade: "intermediário",
    maxJogadores: 14,
    status: "ABERTA",
    placarTimeA: 0,
    placarTimeB: 0,
    timeA: [],
    timeB: [],
    salaId: 1,
    jogadoresConfirmados: [
      {
        id: 1,
        nome: "João",
        email: "joao@email.com",
        posicao: "ATACANTE",
        estatisticas: {
          golsMarcados: 10,
          totalPartidas: 15,
          vitorias: 8,
          derrotas: 4,
          empates: 3,
          golsSofridos: 0,
          fairPlayScore: 8,
        },
      },
      {
        id: 2,
        nome: "Pedro",
        email: "pedro@email.com",
        posicao: "MEIA",
        estatisticas: {
          golsMarcados: 5,
          totalPartidas: 12,
          vitorias: 6,
          derrotas: 3,
          empates: 3,
          golsSofridos: 0,
          fairPlayScore: 9,
        },
      },
      {
        id: 3,
        nome: "Lucas",
        email: "lucas@email.com",
        posicao: "ZAGUEIRO",
        estatisticas: {
          golsMarcados: 2,
          totalPartidas: 10,
          vitorias: 5,
          derrotas: 3,
          empates: 2,
          golsSofridos: 8,
          fairPlayScore: 7,
        },
      },
    ],
  },
  {
    id: 2,
    titulo: "Futebol Society",
    local: "Arena Soccer House",
    data: new Date().toISOString(),
    dataHora: new Date().toISOString(),
    nivelHabilidade: "iniciante",
    maxJogadores: 12,
    status: "ABERTA",
    placarTimeA: 0,
    placarTimeB: 0,
    timeA: [],
    timeB: [],
    salaId: 2,
    jogadoresConfirmados: [
      {
        id: 4,
        nome: "Carlos",
        email: "carlos@email.com",
        posicao: "GOLEIRO",
        estatisticas: {
          golsMarcados: 0,
          totalPartidas: 8,
          vitorias: 4,
          derrotas: 2,
          empates: 2,
          golsSofridos: 10,
          fairPlayScore: 9,
        },
      },
      {
        id: 5,
        nome: "Miguel",
        email: "miguel@email.com",
        posicao: "ATACANTE",
        estatisticas: {
          golsMarcados: 7,
          totalPartidas: 9,
          vitorias: 5,
          derrotas: 2,
          empates: 2,
          golsSofridos: 0,
          fairPlayScore: 8,
        },
      },
    ],
  },
  {
    id: 3,
    titulo: "Campeonato Amador",
    local: "Estádio Municipal",
    data: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    dataHora: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    nivelHabilidade: "avançado",
    maxJogadores: 22,
    status: "ABERTA",
    placarTimeA: 0,
    placarTimeB: 0,
    timeA: [],
    timeB: [],
    salaId: 3,
    jogadoresConfirmados: [
      {
        id: 6,
        nome: "Rafael",
        email: "rafael@email.com",
        posicao: "MEIA",
        estatisticas: {
          golsMarcados: 12,
          totalPartidas: 20,
          vitorias: 12,
          derrotas: 5,
          empates: 3,
          golsSofridos: 0,
          fairPlayScore: 9,
        },
      },
      {
        id: 7,
        nome: "André",
        email: "andre@email.com",
        posicao: "ATACANTE",
        estatisticas: {
          golsMarcados: 18,
          totalPartidas: 18,
          vitorias: 10,
          derrotas: 5,
          empates: 3,
          golsSofridos: 0,
          fairPlayScore: 7,
        },
      },
      {
        id: 8,
        nome: "Bruno",
        email: "bruno@email.com",
        posicao: "ZAGUEIRO",
        estatisticas: {
          golsMarcados: 3,
          totalPartidas: 15,
          vitorias: 8,
          derrotas: 4,
          empates: 3,
          golsSofridos: 12,
          fairPlayScore: 8,
        },
      },
      {
        id: 9,
        nome: "Diego",
        email: "diego@email.com",
        posicao: "GOLEIRO",
        estatisticas: {
          golsMarcados: 0,
          totalPartidas: 16,
          vitorias: 9,
          derrotas: 4,
          empates: 3,
          golsSofridos: 15,
          fairPlayScore: 9,
        },
      },
    ],
  },
];

const Partidas: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [filtros, setFiltros] = useState<FiltrosState>({
    nivelHabilidade: "",
    busca: "",
  });
  const [tabValue, setTabValue] = useState(0);
  const [success] = useState<string | null>(null);

  useEffect(() => {
    carregarPartidas();
  }, []);

  const carregarPartidas = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: ListarPartidasParams = {
        nivelHabilidade: filtros.nivelHabilidade || undefined,
      };
      if (filtros.busca) {
        params.busca = filtros.busca;
      }

      // Simulando um delay de carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let partidasFiltradas = [...PARTIDAS_MOCK];

      if (params.nivelHabilidade) {
        partidasFiltradas = partidasFiltradas.filter(
          (p) => p.nivelHabilidade === params.nivelHabilidade
        );
      }

      if (params.busca) {
        partidasFiltradas = partidasFiltradas.filter(
          (p) =>
            (p.titulo?.toLowerCase() || "").includes(
              params.busca!.toLowerCase()
            ) || p.local.toLowerCase().includes(params.busca!.toLowerCase())
        );
      }

      setPartidas(partidasFiltradas);
    } catch (err) {
      setError("Erro ao carregar partidas");
    } finally {
      setLoading(false);
    }
  };

  const handleNivelChange = (event: SelectChangeEvent) => {
    const novosFiltros = {
      ...filtros,
      nivelHabilidade: event.target.value,
    };
    setFiltros(novosFiltros);
    const params: ListarPartidasParams = {
      nivelHabilidade: event.target.value || undefined,
    };
    if (novosFiltros.busca) {
      params.busca = novosFiltros.busca;
    }
    aplicarFiltros();
  };

  const handleBuscaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novosFiltros = {
      ...filtros,
      busca: event.target.value,
    };
    setFiltros(novosFiltros);
    const params: ListarPartidasParams = {
      nivelHabilidade: novosFiltros.nivelHabilidade || undefined,
    };
    if (event.target.value) {
      params.busca = event.target.value;
    }
    aplicarFiltros();
  };

  const aplicarFiltros = async () => {
    try {
      setLoading(true);
      setError(null);
    } catch (err) {
      setError("Erro ao aplicar filtros");
    } finally {
      setLoading(false);
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case "iniciante":
        return theme.palette.success.main;
      case "intermediário":
        return theme.palette.warning.main;
      case "avançado":
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getNivelLabel = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case "iniciante":
        return t("matches.niveis.iniciante");
      case "intermediário":
        return t("matches.niveis.intermediario");
      case "avançado":
        return t("matches.niveis.avancado");
      default:
        return nivel;
    }
  };

  const formatarData = (dataString?: string, includeYear: boolean = true) => {
    if (!dataString) return "-";

    const data = new Date(dataString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (data.toDateString() === today.toDateString()) {
      return t("data.hoje");
    } else if (data.toDateString() === tomorrow.toDateString()) {
      return t("data.amanha");
    }

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      ...(includeYear && { year: "numeric" }),
    }).format(data);
  };

  const formatarHora = (dataString?: string) => {
    if (!dataString) return "";

    const data = new Date(dataString);
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderPartidaCard = (partida: Partida) => (
    <Grid item xs={12} sm={6} md={4} key={partida.id}>
      <Fade in={true}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            "&:hover": {
              transform: "translateY(-4px)",
              transition: "transform 0.2s ease-in-out",
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
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {partida.titulo || t("matches.noTitle")}
              </Typography>
              {partida.nivelHabilidade && (
                <Chip
                  label={getNivelLabel(partida.nivelHabilidade)}
                  size="small"
                  sx={{
                    backgroundColor: getNivelColor(partida.nivelHabilidade),
                    color: "white",
                    ml: 1,
                  }}
                />
              )}
            </Box>

            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "text.secondary" }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {partida.local}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <AccessTimeIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatarData(partida.data)} -{" "}
                  {partida.dataHora && formatarHora(partida.dataHora)}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <GroupIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {partida.jogadoresConfirmados?.length || 0}/
                  {partida.maxJogadores || "-"} {t("matches.playersConfirmed")}
                </Typography>
              </Box>

              {partida.jogadoresConfirmados &&
                partida.jogadoresConfirmados.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <AvatarGroup
                      max={3}
                      sx={{
                        "& .MuiAvatar-root": {
                          width: 24,
                          height: 24,
                          fontSize: "0.875rem",
                        },
                      }}
                    >
                      {partida.jogadoresConfirmados.map((jogador) => (
                        <Avatar key={jogador.id} alt={jogador.nome}>
                          {jogador.nome.charAt(0)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                )}
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/partidas/${partida.id}`)}
              sx={{ ml: "auto" }}
            >
              {t("matches.viewDetails")}
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          {t("matches.title")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/criar-partida")}
        >
          {t("navigation.createMatch")}
        </Button>
      </Box>

      <Paper sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t("matches.buscar")}
              value={filtros.busca}
              onChange={handleBuscaChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t("matches.nivel")}</InputLabel>
              <Select
                value={filtros.nivelHabilidade}
                onChange={handleNivelChange}
                label={t("matches.nivel")}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>{t("matches.levels.all")}</em>
                </MenuItem>
                <MenuItem value="iniciante">
                  {t("matches.niveis.iniciante")}
                </MenuItem>
                <MenuItem value="intermediário">
                  {t("matches.niveis.intermediario")}
                </MenuItem>
                <MenuItem value="avançado">
                  {t("matches.niveis.avancado")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="partidas tabs"
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab
            label={t("matches.next")}
            icon={<SportsSoccerIcon />}
            iconPosition="start"
          />
          <Tab
            label={t("matches.mine")}
            icon={<GroupIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {loading ? (
            <LoadingComponent />
          ) : partidas.length === 0 ? (
            <EmptyStateMessage message={t("matches.noMatch")} />
          ) : (
            partidas.map((partida) => renderPartidaCard(partida))
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <EmptyStateMessage message={t("matches.soon")} />
          )}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default Partidas;
