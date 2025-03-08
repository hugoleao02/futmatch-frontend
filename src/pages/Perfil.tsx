import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useTheme,
  Tab,
  Tabs,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GroupsIcon from "@mui/icons-material/Groups";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  position: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  matches: number;
  wins: number;
  goals: number;
  assists: number;
  fairPlay: number;
  streak: number;
  badges: string[];
  bio: string;
}

// Mock do usuário
const mockUser: User = {
  id: 1,
  name: "João Silva",
  email: "joao.silva@email.com",
  avatar: "",
  position: "Atacante",
  level: 8,
  xp: 7500,
  nextLevelXp: 10000,
  matches: 45,
  wins: 32,
  goals: 67,
  assists: 25,
  fairPlay: 95,
  streak: 5,
  badges: ["Artilheiro", "MVP", "Fair Play"],
  bio: "Apaixonado por futebol desde criança. Jogo como atacante e adoro fazer gols!",
};

interface Match {
  id: number;
  title: string;
  date: string;
  location: string;
  result: string;
  score: string;
  goals: number;
  assists: number;
  rating: number;
}

// Mock do histórico de partidas
const mockMatchHistory: Match[] = [
  {
    id: 1,
    title: "Pelada dos Amigos",
    date: "2024-03-15T19:00:00",
    location: "Arena Soccer Club",
    result: "Vitória",
    score: "5 - 3",
    goals: 2,
    assists: 1,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Futebol Society",
    date: "2024-03-10T20:00:00",
    location: "Soccer House",
    result: "Derrota",
    score: "2 - 3",
    goals: 1,
    assists: 0,
    rating: 4.0,
  },
  {
    id: 3,
    title: "Rachão de Quinta",
    date: "2024-03-05T18:30:00",
    location: "Clube Atlético",
    result: "Vitória",
    score: "4 - 2",
    goals: 3,
    assists: 1,
    rating: 5.0,
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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Perfil: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    name: mockUser.name,
    position: mockUser.position,
    bio: mockUser.bio,
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    // Implementar lógica para salvar as alterações
    setOpenEditDialog(false);
  };

  const getBadgeColor = (badge: string) => {
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

  const getResultColor = (result: string) => {
    switch (result) {
      case "Vitória":
        return "success";
      case "Derrota":
        return "error";
      default:
        return "warning";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

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
                src={mockUser.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.main",
                }}
              >
                {mockUser.name.charAt(0)}
              </Avatar>
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
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h5" gutterBottom>
              {mockUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {mockUser.email}
            </Typography>
            <Chip
              label={mockUser.position}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Nível {mockUser.level}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(mockUser.xp / mockUser.nextLevelXp) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "background.default",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {mockUser.xp}/{mockUser.nextLevelXp} XP
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              {mockUser.bio}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {mockUser.badges.map((badge) => (
                <Chip
                  key={badge}
                  label={badge}
                  color={getBadgeColor(badge) as any}
                  size="small"
                />
              ))}
            </Box>
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
                      {mockUser.matches}
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
                      {mockUser.wins}
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
                      {mockUser.goals}
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
                      {mockUser.assists}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Assistências
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
                      {mockUser.fairPlay}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fair Play
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
                      {mockUser.streak}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sequência de Vitórias
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {mockMatchHistory.map((match, index) => (
                  <React.Fragment key={match.id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <Chip
                            label={match.result}
                            color={getResultColor(match.result) as any}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Rating value={match.rating} readOnly size="small" />
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <SportsSoccerIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={match.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {formatDate(match.date)}
                            </Typography>
                            {" — "}
                            {match.location}
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {match.score} • {match.goals} gols •{" "}
                              {match.assists} assistências
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
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
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Posição"
              select
              value={editData.position}
              onChange={(e) =>
                setEditData({ ...editData, position: e.target.value })
              }
              SelectProps={{
                native: true,
              }}
              sx={{ mb: 2 }}
            >
              <option value="goleiro">Goleiro</option>
              <option value="zagueiro">Zagueiro</option>
              <option value="lateral">Lateral</option>
              <option value="meio-campo">Meio-Campo</option>
              <option value="atacante">Atacante</option>
            </TextField>
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={4}
              value={editData.bio}
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
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
