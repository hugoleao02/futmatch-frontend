import EditIcon from "@mui/icons-material/Edit";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Jogador } from "../../../@types";
import { useToast } from "../../../hooks/useToast";
import {
  PerfilService,
  ProfilePhotoService,
} from "../../../infrastructure/services";

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Perfil: React.FC = () => {
  const { showToast } = useToast();
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState<Jogador | null>(null);
  const [editData, setEditData] = useState({
    nome: "",
    posicao: "",
    citacao: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const data = await PerfilService.obterPerfil();
        const photoUrl = await ProfilePhotoService.getProfilePhotoUrl();
        console.log("URL da foto ao carregar:", photoUrl);

        setPerfil((prev) =>
          prev
            ? {
                ...prev,
                ...data,
                fotoPerfilUrl: photoUrl,
              }
            : data
        );

        setEditData({
          nome: data.nome || "",
          posicao: data.posicao || "",
          citacao: data.citacao || "",
        });
      } catch (error) {
        showToast("Erro ao carregar perfil", "error");
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleEditSave = async () => {
    try {
      if (!perfil) return;

      const updatedPerfil = await PerfilService.atualizarPerfil({
        ...perfil,
        nome: editData.nome,
        posicao: editData.posicao,
        citacao: editData.citacao,
      });

      setPerfil(updatedPerfil);
      showToast("Perfil atualizado com sucesso", "success");
      setOpenEditDialog(false);
    } catch (error) {
      showToast("Erro ao atualizar perfil", "error");
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await ProfilePhotoService.uploadProfilePhoto(file);
      const photoUrl = await ProfilePhotoService.getProfilePhotoUrl();
      console.log("Nova URL da foto:", photoUrl);
      if (photoUrl) {
        setPerfil((prev) =>
          prev
            ? {
                ...prev,
                fotoPerfilUrl: photoUrl,
              }
            : null
        );
      }
      showToast("Foto de perfil atualizada com sucesso", "success");
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      showToast("Erro ao atualizar foto de perfil", "error");
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const getBadgeColor = (
    badge: string
  ): "error" | "success" | "info" | "default" => {
    switch (badge) {
      case "Artilheiro":
        return "error";
      case "MVP":
        return "success";
      case "Fair Play":
        return "info";
      default:
        return "default";
    }
  };

  if (loading || !perfil) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Perfil Principal */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              textAlign: "center",
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>

            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                src={perfil.fotoPerfilUrl}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.main",
                  objectFit: "cover",
                  bgcolor: "background.paper",
                }}
                imgProps={{
                  crossOrigin: "anonymous",
                  referrerPolicy: "no-referrer",
                  onError: () => {
                    showToast("Erro ao carregar imagem", "error");
                  },
                }}
              >
                {!perfil.fotoPerfilUrl && perfil.nome?.charAt(0)}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: -8,
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "background.paper",
                  },
                }}
                size="small"
                onClick={handlePhotoClick}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h5" gutterBottom>
              {perfil.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {perfil.email}
            </Typography>
            <Chip
              label={perfil.posicao}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              {perfil.citacao}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {perfil.badgePersonalizado && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label={perfil.badgePersonalizado}
                  color={getBadgeColor(perfil.badgePersonalizado)}
                  size="small"
                />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Conteúdo Principal */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
                variant="fullWidth"
              >
                <Tab
                  icon={<SportsSoccerIcon />}
                  label="Estatísticas"
                  id="profile-tab-0"
                />
                <Tab
                  icon={<EmojiEventsIcon />}
                  label="Histórico"
                  id="profile-tab-1"
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <SportsSoccerIcon
                      sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                    />
                    <Typography variant="h4" gutterBottom>
                      {perfil.estatisticas?.totalPartidas || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Partidas Jogadas
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <EmojiEventsIcon
                      sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
                    />
                    <Typography variant="h4" gutterBottom>
                      {perfil.estatisticas?.totalVitorias || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vitórias
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <StarIcon
                      sx={{ fontSize: 40, color: "error.main", mb: 1 }}
                    />
                    <Typography variant="h4" gutterBottom>
                      {perfil.estatisticas?.totalGols || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gols Marcados
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <WhatshotIcon
                      sx={{ fontSize: 40, color: "secondary.main", mb: 1 }}
                    />
                    <Typography variant="h4" gutterBottom>
                      {perfil.estatisticas?.precisaoPasses || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Precisão de Passes
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <GroupsIcon
                      sx={{ fontSize: 40, color: "info.main", mb: 1 }}
                    />
                    <Typography variant="h4" gutterBottom>
                      {perfil.rankingLocal || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ranking Local
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <WhatshotIcon
                      sx={{ fontSize: 40, color: "success.main", mb: 1 }}
                    />
                    <Typography variant="h4" gutterBottom>
                      {perfil.sequenciaVitorias || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sequência de Vitórias
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">
                  Histórico de partidas em breve...
                </Typography>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo de Edição */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nome"
              value={editData.nome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditData({ ...editData, nome: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Posição"
              select
              value={editData.posicao}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditData({ ...editData, posicao: e.target.value })
              }
              SelectProps={{
                native: true,
              }}
              sx={{ mb: 2 }}
            >
              <option value="GOLEIRO">Goleiro</option>
              <option value="ZAGUEIRO">Zagueiro</option>
              <option value="LATERAL">Lateral</option>
              <option value="MEIO_CAMPO">Meio-Campo</option>
              <option value="ATACANTE">Atacante</option>
            </TextField>
            <TextField
              fullWidth
              label="Citação"
              multiline
              rows={4}
              value={editData.citacao}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditData({ ...editData, citacao: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Perfil;
