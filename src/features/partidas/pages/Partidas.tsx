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
  AvatarGroup,
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
} from "../services/partidasService";

// Definindo interfaces para os tipos necessários
interface PartidaUI extends Partida {}

interface FiltroPartida {
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

const Partidas: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partidas, setPartidas] = useState<PartidaUI[]>([]);
  const [filtros, setFiltros] = useState<FiltroPartida>({
    nivelHabilidade: "",
    busca: "",
  });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    carregarPartidas();
  }, []);

  const carregarPartidas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await listarPartidas({
        nivelHabilidade: filtros.nivelHabilidade || undefined,
        busca: filtros.busca || undefined,
      });
      setPartidas(response);
    } catch (err) {
      setError("Erro ao carregar partidas");
      console.error(err);
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
    aplicarFiltros({
      nivelHabilidade: event.target.value || undefined,
      busca: novosFiltros.busca || undefined,
    });
  };

  const handleBuscaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novosFiltros = {
      ...filtros,
      busca: event.target.value,
    };
    setFiltros(novosFiltros);
    aplicarFiltros({
      nivelHabilidade: novosFiltros.nivelHabilidade || undefined,
      busca: event.target.value || undefined,
    });
  };

  const aplicarFiltros = async (filtrosAtualizados: FiltroPartidaDTO) => {
    try {
      setLoading(true);
      setError(null);
      const response = await listarPartidas(filtrosAtualizados);
      setPartidas(response);
    } catch (err) {
      setError("Erro ao aplicar filtros");
      console.error(err);
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
        return t("nivel.iniciante");
      case "intermediário":
        return t("nivel.intermediario");
      case "avançado":
        return t("nivel.avancado");
      default:
        return nivel;
    }
  };

  const getOcupacaoPercent = (atual: number, max: number) => {
    return (atual / max) * 100;
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(data);
  };

  const formatarHora = (dataString: string) => {
    const data = new Date(dataString);
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aberta":
        return theme.palette.success.main;
      case "em andamento":
        return theme.palette.warning.main;
      case "finalizada":
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "aberta":
        return t("status.aberta");
      case "em andamento":
        return t("status.emAndamento");
      case "finalizada":
        return t("status.finalizada");
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return t("data.hoje");
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t("data.amanha");
    } else {
      return formatarData(dateString);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("partidas.titulo")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate("/partidas/criar")}
              >
                {t("partidas.criarPartida")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t("partidas.buscar")}
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
              <InputLabel>{t("partidas.nivel")}</InputLabel>
              <Select
                value={filtros.nivelHabilidade}
                onChange={handleNivelChange}
                label={t("partidas.nivel")}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>{t("partidas.todos")}</em>
                </MenuItem>
                <MenuItem value="iniciante">{t("nivel.iniciante")}</MenuItem>
                <MenuItem value="intermediário">
                  {t("nivel.intermediario")}
                </MenuItem>
                <MenuItem value="avançado">{t("nivel.avancado")}</MenuItem>
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

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="partidas tabs"
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab
            label={t("partidas.proximas")}
            icon={<SportsSoccerIcon />}
            iconPosition="start"
          />
          <Tab
            label={t("partidas.minhas")}
            icon={<GroupIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} textAlign="center">
              <CircularProgress />
            </Grid>
          ) : partidas.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="textSecondary">
                  {t("partidas.nenhumaPartida")}
                </Typography>
              </Paper>
            </Grid>
          ) : (
            partidas.map((partida) => (
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
                          {partida.titulo}
                        </Typography>
                        <Chip
                          label={getNivelLabel(partida.nivelHabilidade)}
                          size="small"
                          sx={{
                            backgroundColor: getNivelColor(
                              partida.nivelHabilidade
                            ),
                            color: "white",
                            ml: 1,
                          }}
                        />
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
                            {formatDate(partida.dataHora)} -{" "}
                            {formatarHora(partida.dataHora)}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                          <GroupIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {partida.jogadoresConfirmados.length}/
                            {partida.maxJogadores}{" "}
                            {t("partidas.jogadoresConfirmados")}
                          </Typography>
                        </Box>

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
                              <Avatar
                                key={jogador.id}
                                alt={jogador.nome}
                                src={jogador.avatar}
                              >
                                {jogador.nome.charAt(0)}
                              </Avatar>
                            ))}
                          </AvatarGroup>
                        </Box>
                      </Stack>
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(`/partidas/${partida.id}`)}
                        sx={{ ml: "auto" }}
                      >
                        {t("partidas.verDetalhes")}
                      </Button>
                    </CardActions>
                  </Card>
                </Fade>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} textAlign="center">
              <CircularProgress />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="textSecondary">
                  {t("partidas.emBreve")}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default Partidas;
