import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import StarIcon from "@mui/icons-material/Star";
import dayjs from "dayjs";
import {
  SalasService,
  Sala,
  Mensagem,
  EnviarMensagemDTO,
} from "../infrastructure/services";
import { Jogador } from "../types/api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sala-tabpanel-${index}`}
      aria-labelledby={`sala-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const DetalhesSala: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [sala, setSala] = useState<Sala | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [enviandoMensagem, setEnviandoMensagem] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"sair" | "deletar" | null>(
    null
  );

  const carregarSala = async () => {
    try {
      setLoading(true);
      const salaData = await SalasService.obterSala(Number(id));
      setSala(salaData);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar sala");
    } finally {
      setLoading(false);
    }
  };

  const carregarMensagens = async () => {
    try {
      setCarregandoMensagens(true);
      const mensagensData = await SalasService.listarMensagens(Number(id));
      setMensagens(mensagensData);
    } catch (err: any) {
      console.error("Erro ao carregar mensagens:", err);
    } finally {
      setCarregandoMensagens(false);
    }
  };

  useEffect(() => {
    carregarSala();
  }, [id]);

  useEffect(() => {
    if (tabValue === 1 && sala) {
      carregarMensagens();
    }
  }, [tabValue]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEnviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    try {
      setEnviandoMensagem(true);
      const mensagemData: EnviarMensagemDTO = {
        conteudo: novaMensagem,
        salaId: Number(id),
      };

      await SalasService.enviarMensagem(mensagemData);
      setNovaMensagem("");
      carregarMensagens();
    } catch (err: any) {
      console.error("Erro ao enviar mensagem:", err);
    } finally {
      setEnviandoMensagem(false);
    }
  };

  const handleEntrarSala = async () => {
    try {
      setLoading(true);
      await SalasService.entrarNaSala(Number(id));
      carregarSala();
    } catch (err: any) {
      setError(err.message || "Erro ao entrar na sala");
    } finally {
      setLoading(false);
    }
  };

  const handleSairSala = async () => {
    try {
      setLoading(true);
      await SalasService.sairDaSala(Number(id));
      carregarSala();
    } catch (err: any) {
      setError(err.message || "Erro ao sair da sala");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletarSala = async () => {
    try {
      setLoading(true);
      await SalasService.deletarSala(Number(id));
      navigate("/dashboard/salas");
    } catch (err: any) {
      setError(err.message || "Erro ao deletar sala");
    } finally {
      setLoading(false);
    }
  };

  const handleEditarSala = () => {
    if (!id) return;
    navigate(`/dashboard/salas/${id}/editar`);
  };

  const handleCriarPartida = () => {
    if (!id) return;
    navigate(`/dashboard/salas/${id}/criar-partida`);
  };

  const handleConfirmDialog = (action: "sair" | "deletar") => {
    setDialogAction(action);
    setConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (dialogAction === "sair") {
      handleSairSala();
    } else if (dialogAction === "deletar") {
      handleDeletarSala();
    }
  };

  const getNivelLabel = (min: number, max: number) => {
    if (min <= 3 && max <= 3) return t("Iniciante");
    if (min >= 8) return t("Avançado");
    return t("Intermediário");
  };

  const getNivelColor = (min: number, max: number) => {
    if (min <= 3 && max <= 3) return "success";
    if (min >= 8) return "error";
    return "warning";
  };

  const isUserMember = () => {
    if (!sala) return false;
    // Aqui você deve verificar se o usuário logado é membro da sala
    // Isso depende de como você está gerenciando a autenticação
    // Por exemplo: return sala.jogadores.some(j => j.id === usuarioLogado.id);
    return false; // Placeholder
  };

  const isUserOwner = () => {
    if (!sala) return false;
    // Aqui você deve verificar se o usuário logado é o dono da sala
    // Por exemplo: return sala.criadoPor === usuarioLogado.id;
    return false; // Placeholder
  };

  const isUserModerator = () => {
    if (!sala) return false;
    // Aqui você deve verificar se o usuário logado é moderador da sala
    // Por exemplo: return sala.moderadores.some(m => m.id === usuarioLogado.id);
    return false; // Placeholder
  };

  if (loading && !sala) {
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 8, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error && !sala) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/salas")}
          >
            {t("Voltar para Salas")}
          </Button>
        </Box>
      </Container>
    );
  }

  if (!sala) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Alert severity="warning">{t("Sala não encontrada")}</Alert>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/salas")}
          >
            {t("Voltar para Salas")}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" gutterBottom>
                {sala.nome}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Chip
                  label={getNivelLabel(sala.nivelMinimo, sala.nivelMaximo)}
                  color={
                    getNivelColor(sala.nivelMinimo, sala.nivelMaximo) as any
                  }
                  sx={{ mr: 1 }}
                />
                {sala.isPublica ? (
                  <Chip label={t("Pública")} />
                ) : (
                  <Chip label={t("Privada")} color="default" />
                )}
                {sala.aceitaAutomatico && (
                  <Chip
                    label={t("Entrada Automática")}
                    color="info"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">{sala.localizacao}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  {dayjs(sala.dataHora).format("DD/MM/YYYY [às] HH:mm")}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  {sala.jogadores.length}/{sala.numeroJogadores}{" "}
                  {t("jogadores")}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {!isUserMember() ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<PersonAddIcon />}
                  onClick={handleEntrarSala}
                  disabled={loading}
                >
                  {t("Entrar na Sala")}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<PersonRemoveIcon />}
                  onClick={() => handleConfirmDialog("sair")}
                  disabled={loading}
                >
                  {t("Sair da Sala")}
                </Button>
              )}

              {isUserMember() && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={handleCriarPartida}
                  disabled={loading}
                >
                  {t("Criar Partida")}
                </Button>
              )}

              {(isUserOwner() || isUserModerator()) && (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={handleEditarSala}
                  disabled={loading}
                >
                  {t("Editar Sala")}
                </Button>
              )}

              {isUserOwner() && (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={() => handleConfirmDialog("deletar")}
                  disabled={loading}
                >
                  {t("Deletar Sala")}
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="sala tabs"
          >
            <Tab
              label={t("Informações")}
              id="sala-tab-0"
              aria-controls="sala-tabpanel-0"
            />
            <Tab
              label={t("Chat")}
              id="sala-tab-1"
              aria-controls="sala-tabpanel-1"
            />
            <Tab
              label={t("Membros")}
              id="sala-tab-2"
              aria-controls="sala-tabpanel-2"
            />
            <Tab
              label={t("Partidas")}
              id="sala-tab-3"
              aria-controls="sala-tabpanel-3"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {sala.regrasPersonalizadas && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {t("Regras Personalizadas")}
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body1">
                    {sala.regrasPersonalizadas}
                  </Typography>
                </Paper>
              </Grid>
            )}

            {sala.restricoesPosicao &&
              Object.keys(sala.restricoesPosicao).length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    {t("Restrições de Posição")}
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Grid container spacing={1}>
                      {Object.entries(sala.restricoesPosicao).map(
                        ([posicao, quantidade]) => (
                          <Grid item xs={6} key={posicao}>
                            <Typography variant="body1">
                              {t(posicao)}: {quantidade}
                            </Typography>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              )}

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                {t("Requisitos de Participação")}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {t("Nível")}: {sala.nivelMinimo} - {sala.nivelMaximo}
                </Typography>
                {sala.minimoFairPlay && (
                  <Typography variant="body1">
                    {t("Mínimo Fair Play")}: {sala.minimoFairPlay}
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t("Detalhes Adicionais")}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                      {t("Criado por")}: {sala.criadoPor}
                    </Typography>
                    <Typography variant="body1">
                      {t("Data de Criação")}:{" "}
                      {dayjs(sala.dataCriacao).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {sala.dataUltimaAtividade && (
                      <Typography variant="body1">
                        {t("Última Atividade")}:{" "}
                        {dayjs(sala.dataUltimaAtividade).format("DD/MM/YYYY")}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: "flex", flexDirection: "column", height: 400 }}>
            <Box sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
              {mensagens.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {t("Nenhuma mensagem ainda. Seja o primeiro a enviar!")}
                  </Typography>
                </Box>
              ) : (
                <List>
                  {mensagens.map((mensagem) => (
                    <ListItem key={mensagem.id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{mensagem.jogadorNome.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle2">
                              {mensagem.jogadorNome}
                              {mensagem.isAnuncio && (
                                <Chip
                                  size="small"
                                  label={t("Anúncio")}
                                  color="info"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {dayjs(mensagem.dataHora).format("DD/MM HH:mm")}
                            </Typography>
                          </Box>
                        }
                        secondary={mensagem.conteudo}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            {isUserMember() && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder={t("Digite sua mensagem...")}
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  disabled={enviandoMensagem}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleEnviarMensagem();
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleEnviarMensagem}
                  disabled={enviandoMensagem || !novaMensagem.trim()}
                >
                  {enviandoMensagem ? (
                    <CircularProgress size={24} />
                  ) : (
                    <SendIcon />
                  )}
                </IconButton>
              </Box>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t("Membros")} ({sala.jogadores.length}/{sala.numeroJogadores})
              </Typography>

              {sala.jogadores.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  {t("Nenhum membro na sala ainda.")}
                </Typography>
              ) : (
                <List>
                  {sala.jogadores.map((jogador) => (
                    <ListItem
                      key={jogador.id}
                      secondaryAction={
                        (isUserOwner() || isUserModerator()) &&
                        jogador.id.toString() !== sala.criadoPor ? (
                          <IconButton
                            edge="end"
                            aria-label="remove"
                            color="error"
                          >
                            <PersonRemoveIcon />
                          </IconButton>
                        ) : null
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>{jogador.apelido.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {jogador.apelido}
                            {jogador.id.toString() === sala.criadoPor && (
                              <Chip
                                size="small"
                                icon={<StarIcon />}
                                label={t("Dono")}
                                color="primary"
                                sx={{ ml: 1 }}
                              />
                            )}
                            {sala.moderadores?.some(
                              (m) => m.id === jogador.id
                            ) && (
                              <Chip
                                size="small"
                                label={t("Moderador")}
                                color="secondary"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" component="span">
                              {jogador.posicao
                                ? t(jogador.posicao)
                                : t("Sem posição")}{" "}
                              •{t("Nível")}: {jogador.nivelHabilidade} •
                              {t("Fair Play")}: {jogador.pontuacaoFairPlay}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">{t("Partidas")}</Typography>

            {isUserMember() && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCriarPartida}
              >
                {t("Criar Partida")}
              </Button>
            )}
          </Box>

          <Typography variant="body1" color="text.secondary">
            {t("Nenhuma partida agendada.")}
          </Typography>
        </TabPanel>
      </Paper>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>
          {dialogAction === "sair" ? t("Sair da Sala?") : t("Deletar Sala?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogAction === "sair"
              ? t(
                  "Tem certeza que deseja sair desta sala? Você precisará de aprovação para entrar novamente."
                )
              : t(
                  "Tem certeza que deseja deletar esta sala? Esta ação não pode ser desfeita."
                )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>
            {t("Cancelar")}
          </Button>
          <Button onClick={handleConfirmAction} color="error" autoFocus>
            {dialogAction === "sair" ? t("Sair") : t("Deletar")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DetalhesSala;
