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
  CircularProgress,
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
import React from "react";
import ImageEditor from "../../../components/ImageEditor";
import { usePerfil } from "../hooks/usePerfil";
import { usePerfilPhoto } from "../hooks/usePerfilPhoto";
import { usePerfilTabs } from "../hooks/usePerfilTabs";

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
  const {
    loading,
    perfil,
    openEditDialog,
    editData,
    setEditData,
    setOpenEditDialog,
    handleEditSave,
    getBadgeColor,
  } = usePerfil();

  const {
    photoUrl,
    tempPhotoUrl,
    isLoadingPhoto,
    photoError,
    fileInputRef,
    isEditorOpen,
    selectedImageUrl,
    handlePhotoSelect,
    handlePhotoUpload,
    handlePhotoClick,
    handleEditorClose,
  } = usePerfilPhoto();

  const { tabValue, handleTabChange } = usePerfilTabs();

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
              onClick={() => setOpenEditDialog(true)}
            >
              <EditIcon />
            </IconButton>

            <Box
              sx={{
                position: "relative",
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
              }}
            >
              <Avatar
                src={tempPhotoUrl || photoUrl}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "4px solid",
                  borderColor: photoError ? "error.main" : "primary.main",
                  objectFit: "cover",
                  bgcolor: "background.paper",
                  opacity: isLoadingPhoto ? 0.7 : 1,
                  transition: "opacity 0.2s ease",
                }}
                imgProps={{
                  loading: "lazy",
                  onError: (e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.onerror = null;
                    imgElement.src = "";
                  },
                }}
              >
                {!tempPhotoUrl && !photoUrl && perfil?.nome?.charAt(0)}
              </Avatar>
              {isLoadingPhoto && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "50%",
                  }}
                >
                  <CircularProgress size={40} />
                </Box>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePhotoSelect}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: -8,
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

        {/* Editor de Imagem */}
        {isEditorOpen && selectedImageUrl && (
          <ImageEditor
            open={isEditorOpen}
            onClose={handleEditorClose}
            imageUrl={selectedImageUrl}
            onSave={handlePhotoUpload}
          />
        )}

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
