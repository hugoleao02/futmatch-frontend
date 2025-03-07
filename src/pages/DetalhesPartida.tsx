import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTranslation } from "react-i18next";
import { useAuth } from "../presentation/hooks/useAuth";
import { PartidasService } from "../infrastructure/services";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`partida-tabpanel-${index}`}
      aria-labelledby={`partida-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const DetalhesPartida: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const { user } = useAuth();

  const [partida, setPartida] = useState<Partida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "participar" | "sair" | "excluir"
  >("participar");
  const [actionLoading, setActionLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const carregarPartida = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await PartidasService.obterPartida(id);
          setPartida(data);
        }
      } catch (err) {
        console.error("Erro ao carregar partida:", err);
        setError("Não foi possível carregar os detalhes da partida.");
      } finally {
        setLoading(false);
      }
    };

    carregarPartida();
  }, [id]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (action: "participar" | "sair" | "excluir") => {
    setDialogAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmAction = async () => {
    setActionLoading(true);
    try {
      if (!id) return;

      switch (dialogAction) {
        case "participar":
          await PartidasService.participarPartida(id);
          setSnackbar({
            open: true,
            message: "Você foi adicionado à partida com sucesso!",
            severity: "success",
          });
          // Atualizar a lista de jogadores
          const partidaAtualizada = await PartidasService.obterPartida(id);
          setPartida(partidaAtualizada);
          break;
        case "sair":
          await PartidasService.sairPartida(id);
          setSnackbar({
            open: true,
            message: "Você saiu da partida com sucesso!",
            severity: "success",
          });
          // Atualizar a lista de jogadores
          const partidaAtualizadaSaida = await PartidasService.obterPartida(id);
          setPartida(partidaAtualizadaSaida);
          break;
        case "excluir":
          await PartidasService.excluirPartida(id);
          setSnackbar({
            open: true,
            message: "Partida excluída com sucesso!",
            severity: "success",
          });
          // Redirecionar para a lista de partidas após exclusão
          setTimeout(() => {
            navigate("/dashboard/partidas");
          }, 1500);
          break;
      }
    } catch (err) {
      console.error(`Erro ao ${dialogAction} partida:`, err);
      setSnackbar({
        open: true,
        message: `Ocorreu um erro ao ${
          dialogAction === "participar"
            ? "participar da"
            : dialogAction === "sair"
            ? "sair da"
            : "excluir a"
        } partida.`,
        severity: "error",
      });
    } finally {
      setActionLoading(false);
      setOpenDialog(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isOrganizador = partida?.organizadorId === user?.id;
  const isParticipante = partida?.jogadoresConfirmados.some(
    (j) => j.id === user?.id
  );
  const isEmEspera = partida?.jogadoresEspera.some((j) => j.id === user?.id);
  const partidaCheia = partida
    ? partida.jogadoresConfirmados.length >= partida.maxJogadores
    : false;

  const getNivelHabilidadeLabel = (nivel: string) => {
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

  const getNivelHabilidadeColor = (nivel: string) => {
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

  const getTipoInscricaoLabel = (tipo: string) => {
    switch (tipo) {
      case "ABERTA":
        return "Aberta (qualquer um pode participar)";
      case "APROVACAO":
        return "Aprovação (organizador aprova participantes)";
      case "CONVITE":
        return "Convite (apenas convidados podem participar)";
      default:
        return tipo;
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          p: 3,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t("common.loading")}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard/partidas")}
            variant="outlined"
          >
            {t("common.backToMatches")}
          </Button>
        </Box>
      </Box>
    );
  }

  if (!partida) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">{t("match.notFound")}</Alert>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard/partidas")}
            variant="text"
            sx={{ mb: 2 }}
          >
            {t("common.backToMatches")}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard/partidas")}
          variant="text"
          sx={{ mb: 2 }}
        >
          Voltar para Partidas
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Cabeçalho da partida */}
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: "white",
              p: 3,
              mx: -4,
              mt: -4,
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                {partida.titulo}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Chip
                  label={getNivelHabilidadeLabel(partida.nivelHabilidade)}
                  color={
                    getNivelHabilidadeColor(partida.nivelHabilidade) as any
                  }
                  size="medium"
                  sx={{ mr: 1, fontWeight: "bold" }}
                />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Organizado por {partida.organizadorNome || "Anônimo"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: { xs: 2, sm: 0 } }}>
              {!isParticipante && !isEmEspera && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PersonAddIcon />}
                  onClick={() => handleOpenDialog("participar")}
                  disabled={
                    partidaCheia && partida.tipoInscricao !== "APROVACAO"
                  }
                  sx={{ fontWeight: "bold", borderRadius: 2 }}
                >
                  {partidaCheia ? "Entrar na Lista de Espera" : "Participar"}
                </Button>
              )}

              {(isParticipante || isEmEspera) && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ExitToAppIcon />}
                  onClick={() => handleOpenDialog("sair")}
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {isParticipante
                    ? "Sair da Partida"
                    : "Sair da Lista de Espera"}
                </Button>
              )}

              {isOrganizador && (
                <Box sx={{ display: "flex", mt: { xs: 2, sm: 0 } }}>
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      navigate(`/dashboard/editar-partida/${partida.id}`)
                    }
                    sx={{ ml: 1, bgcolor: "rgba(255,255,255,0.1)" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => handleOpenDialog("excluir")}
                    sx={{ ml: 1, bgcolor: "rgba(255,255,255,0.1)" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          {/* Informações principais */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: `${theme.palette.primary.light}20`,
                          color: theme.palette.primary.main,
                          width: 48,
                          height: 48,
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
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: `${theme.palette.primary.light}20`,
                          color: theme.palette.primary.main,
                          width: 48,
                          height: 48,
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
                          {formatarData(partida.dataHora)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: `${theme.palette.primary.light}20`,
                          color: theme.palette.primary.main,
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        <GroupIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Jogadores
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {partida.jogadoresConfirmados.length}/
                          {partida.maxJogadores}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: `${theme.palette.primary.light}20`,
                          color: theme.palette.primary.main,
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        <AttachMoneyIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Valor por Jogador
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {partida.valorPorJogador
                            ? `R$ ${partida.valorPorJogador.toFixed(2)}`
                            : "Gratuito"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Informações adicionais */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Informações Adicionais
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Duração
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {partida.duracaoMinutos} minutos
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Tipo de Inscrição
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {getTipoInscricaoLabel(partida.tipoInscricao)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Substituições Automáticas
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {partida.permitirSubstituicoes
                        ? "Ativadas"
                        : "Desativadas"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {partida.descricao && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Descrição
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">{partida.descricao}</Typography>
                  </Paper>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      aria-label="partida tabs"
                      variant="fullWidth"
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        mb: 2,
                      }}
                    >
                      <Tab
                        label={t("match.details")}
                        id="partida-tab-0"
                        aria-controls="partida-tabpanel-0"
                      />
                      <Tab
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {t("match.players")}
                            <Chip
                              size="small"
                              label={`${partida.jogadoresConfirmados.length}/${partida.maxJogadores}`}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                    </Tabs>
                  </Box>

                  <TabPanel value={tabValue} index={0}>
                    <List sx={{ maxHeight: 400, overflow: "auto" }}>
                      {partida.jogadoresConfirmados.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 2 }}>
                          <Typography color="text.secondary">
                            Nenhum jogador confirmado ainda
                          </Typography>
                        </Box>
                      ) : (
                        partida.jogadoresConfirmados.map((jogador) => (
                          <ListItem
                            key={jogador.id}
                            secondaryAction={
                              jogador.id === partida.organizadorId && (
                                <Tooltip title="Organizador">
                                  <StarIcon color="primary" />
                                </Tooltip>
                              )
                            }
                          >
                            <ListItemAvatar>
                              <Avatar src={jogador.avatar || undefined}>
                                {jogador.nome.charAt(0).toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Typography
                                    variant="body1"
                                    fontWeight={
                                      jogador.id === user?.id
                                        ? "bold"
                                        : "normal"
                                    }
                                  >
                                    {jogador.nome}
                                    {jogador.id === user?.id && " (Você)"}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {jogador.posicao || "Posição não definida"}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))
                      )}
                    </List>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <List sx={{ maxHeight: 400, overflow: "auto" }}>
                      {partida.jogadoresEspera.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 2 }}>
                          <Typography color="text.secondary">
                            Nenhum jogador na lista de espera
                          </Typography>
                        </Box>
                      ) : (
                        partida.jogadoresEspera.map((jogador, index) => (
                          <ListItem
                            key={jogador.id}
                            secondaryAction={
                              <Chip
                                label={`#${index + 1}`}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            }
                          >
                            <ListItemAvatar>
                              <Avatar src={jogador.avatar || undefined}>
                                {jogador.nome.charAt(0).toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={
                                    jogador.id === user?.id ? "bold" : "normal"
                                  }
                                >
                                  {jogador.nome}
                                  {jogador.id === user?.id && " (Você)"}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {jogador.posicao || "Posição não definida"}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))
                      )}
                    </List>
                  </TabPanel>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Diálogo de confirmação */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogAction === "participar"
            ? partidaCheia
              ? "Entrar na lista de espera?"
              : "Participar desta partida?"
            : dialogAction === "sair"
            ? "Sair da partida?"
            : "Excluir partida?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogAction === "participar"
              ? partidaCheia
                ? "A partida está cheia. Você será adicionado à lista de espera e será notificado caso uma vaga seja aberta."
                : "Ao confirmar, você será adicionado à lista de jogadores desta partida."
              : dialogAction === "sair"
              ? "Ao confirmar, você será removido desta partida. Sua vaga poderá ser preenchida por outro jogador."
              : "Esta ação não pode ser desfeita. Todos os dados da partida serão excluídos permanentemente."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={actionLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={dialogAction === "excluir" ? "error" : "primary"}
            variant="contained"
            disabled={actionLoading}
            autoFocus
          >
            {actionLoading ? (
              <CircularProgress size={24} />
            ) : dialogAction === "participar" ? (
              "Confirmar Participação"
            ) : dialogAction === "sair" ? (
              "Confirmar Saída"
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensagens */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DetalhesPartida;
