import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Alert,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface Player {
  id: number;
  name: string;
  avatar: string;
  position: string;
  status?: string;
}

interface Match {
  id: number;
  title: string;
  date: string;
  location: string;
  address: string;
  maxPlayers: number;
  currentPlayers: number;
  price: number;
  status: string;
  gameType: string;
  duration: number;
  skillLevel: string;
  organizer: {
    id: number;
    name: string;
    avatar: string;
    position: string;
  };
  players: Player[];
  waitingList: Player[];
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
      id={`match-tabpanel-${index}`}
      aria-labelledby={`match-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Mock da partida
const mockMatch: Match = {
  id: 1,
  title: "Pelada dos Amigos",
  date: "2024-03-20T19:00:00",
  location: "Arena Soccer Club",
  address: "Rua das Palmeiras, 123",
  maxPlayers: 14,
  currentPlayers: 10,
  price: 25.0,
  status: "open",
  gameType: "society",
  duration: 90,
  skillLevel: "casual",
  organizer: {
    id: 1,
    name: "João Silva",
    avatar: "",
    position: "Atacante",
  },
  players: [
    {
      id: 1,
      name: "João Silva",
      avatar: "",
      position: "Atacante",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Pedro Santos",
      avatar: "",
      position: "Meio-Campo",
      status: "confirmed",
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      avatar: "",
      position: "Zagueiro",
      status: "confirmed",
    },
    {
      id: 4,
      name: "Lucas Mendes",
      avatar: "",
      position: "Goleiro",
      status: "pending",
    },
  ],
  waitingList: [
    {
      id: 5,
      name: "Rafael Costa",
      avatar: "",
      position: "Atacante",
    },
  ],
};

const DetalhesPartida: React.FC = () => {
  const theme = useTheme();
  useParams();
  const [tabValue, setTabValue] = useState(0);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [position, setPosition] = useState("");

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleJoinClick = () => {
    setOpenJoinDialog(true);
  };

  const handleJoinConfirm = () => {
    // Implementar lógica para participar da partida
    setOpenJoinDialog(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
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

  const getPlayerStatusColor = (status?: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPlayerStatusText = (status?: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

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
          {mockMatch.title}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Informações Principais */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom>
                  Detalhes da Partida
                </Typography>
                <Chip
                  label={getStatusText(mockMatch.status)}
                  color={getStatusColor(mockMatch.status) as any}
                  sx={{ mb: 2 }}
                />
              </Box>
              <IconButton
                color="primary"
                onClick={() => {
                  navigator.share({
                    title: mockMatch.title,
                    text: `Partida de futebol ${mockMatch.title} no ${
                      mockMatch.location
                    } - ${formatDate(mockMatch.date)}`,
                    url: window.location.href,
                  });
                }}
              >
                <ShareIcon />
              </IconButton>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body1">
                    {formatDate(mockMatch.date)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Box>
                    <Typography variant="body1">
                      {mockMatch.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mockMatch.address}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <GroupIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body1">
                    {mockMatch.currentPlayers}/{mockMatch.maxPlayers} jogadores
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AttachMoneyIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body1">
                    R$ {mockMatch.price.toFixed(2)} por jogador
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Organizador
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={mockMatch.organizer.avatar}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  >
                    {mockMatch.organizer.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1">
                      {mockMatch.organizer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mockMatch.organizer.position}
                    </Typography>
                  </Box>
                  <IconButton
                    color="success"
                    sx={{ ml: "auto" }}
                    onClick={() => {
                      window.open(
                        `https://wa.me/?text=Olá! Vi sua partida "${mockMatch.title}" no FutMatch e gostaria de participar!`,
                        "_blank"
                      );
                    }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Ações e Informações Adicionais */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Participação
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                {mockMatch.status === "open"
                  ? `${
                      mockMatch.maxPlayers - mockMatch.currentPlayers
                    } vagas disponíveis`
                  : "Partida lotada"}
              </Alert>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tipo de Jogo
                </Typography>
                <Chip
                  label={
                    mockMatch.gameType === "society"
                      ? "Society"
                      : mockMatch.gameType === "campo"
                      ? "Campo"
                      : "Futsal"
                  }
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Nível
                </Typography>
                <Chip
                  label={
                    mockMatch.skillLevel === "casual"
                      ? "Casual"
                      : mockMatch.skillLevel === "intermediario"
                      ? "Intermediário"
                      : "Competitivo"
                  }
                  color="secondary"
                  variant="outlined"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Duração
                </Typography>
                <Typography variant="body1">
                  {mockMatch.duration} minutos
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PersonAddIcon />}
                onClick={handleJoinClick}
                disabled={mockMatch.status === "full"}
              >
                Participar da Partida
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Lista de Jogadores */}
        <Grid item xs={12}>
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
                aria-label="match tabs"
                variant="fullWidth"
              >
                <Tab
                  icon={<GroupIcon />}
                  label={`Jogadores (${mockMatch.players.length})`}
                  id="match-tab-0"
                />
                <Tab
                  icon={<PersonAddIcon />}
                  label={`Lista de Espera (${mockMatch.waitingList.length})`}
                  id="match-tab-1"
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <List>
                {mockMatch.players.map((player: Player, index: number) => (
                  <React.Fragment key={player.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ListItem
                      secondaryAction={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            label={getPlayerStatusText(player.status)}
                            color={getPlayerStatusColor(player.status) as any}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <IconButton
                            edge="end"
                            aria-label="remove"
                            color="error"
                          >
                            <PersonRemoveIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={player.avatar}>
                          {player.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={player.name}
                        secondary={player.position}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {mockMatch.waitingList.map((player: Player, index: number) => (
                  <React.Fragment key={player.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="add" color="success">
                          <PersonAddIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={player.avatar}>
                          {player.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={player.name}
                        secondary={player.position}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo para participar da partida */}
      <Dialog
        open={openJoinDialog}
        onClose={() => setOpenJoinDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Participar da Partida</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Posição"
              select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="" disabled>
                Selecione sua posição
              </option>
              <option value="goleiro">Goleiro</option>
              <option value="zagueiro">Zagueiro</option>
              <option value="lateral">Lateral</option>
              <option value="meio-campo">Meio-Campo</option>
              <option value="atacante">Atacante</option>
            </TextField>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              Valor por jogador: R$ {mockMatch.price.toFixed(2)}
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJoinDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleJoinConfirm}
            variant="contained"
            disabled={!position}
          >
            Confirmar Participação
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DetalhesPartida;
