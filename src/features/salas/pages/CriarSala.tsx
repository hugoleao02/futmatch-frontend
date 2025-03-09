import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ptBR from "date-fns/locale/pt-BR";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NivelCompetitividade } from "../../../@types/enums/NivelCompetitividade";
import { TipoInscricao } from "../../../@types/enums/TipoInscricao";
import { TipoJogador } from "../../../@types/enums/TipoJogador";
import { TipoJogo } from "../../../@types/enums/TipoJogo";
import { CriarSalaCommand } from "../../../@types/sala/CriarSalaCommand";
import { useAuth } from "../../../hooks/useAuth";
import { SalasService } from "../../../infrastructure/services/SalasService";
const steps = ["Informações Básicas", "Configurações", "Confirmação"];

interface FormData {
  title: string;
  description: string;
  date: Date | null;
  location: string;
  address: string;
  maxPlayers: number;
  minPlayers: number;
  price: string;
  gameType: string;
  duration: number;
  skillLevel: string;
  subscriptionType: string;
  allowSubstitutes: boolean;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  date: new Date(new Date().setHours(new Date().getHours() + 1)),
  location: "",
  address: "",
  maxPlayers: 14,
  minPlayers: 10,
  price: "",
  gameType: "society",
  duration: 90,
  skillLevel: "casual",
  subscriptionType: "open",
  allowSubstitutes: true,
};

const CriarSala: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeStep !== steps.length - 1) {
      handleNext();
      return;
    }

    if (!user) {
      setError("Você precisa estar logado para criar uma sala");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const salaData: CriarSalaCommand = {
        nome: formData.title.trim(),
        descricao: formData.description.trim(),
        dataHoraPartida:
          formData.date?.toISOString() || new Date().toISOString(),
        local: formData.location.trim(),
        endereco: formData.address.trim(),
        duracao: formData.duration,
        numeroMinimoJogadores: formData.minPlayers,
        maxJogadores: formData.maxPlayers,
        valorPorJogador: formData.price ? Number(formData.price) : undefined,
        tipoInscricao:
          formData.subscriptionType === "open"
            ? TipoInscricao.ABERTA
            : formData.subscriptionType === "invite"
            ? TipoInscricao.APENAS_CONVIDADOS
            : TipoInscricao.FECHADA,
        tipoJogadorPermitido:
          formData.skillLevel === "casual"
            ? TipoJogador.INICIANTE
            : formData.skillLevel === "intermediario"
            ? TipoJogador.INTERMEDIARIO
            : TipoJogador.AVANCADO,
        permitirSubstituicoesAutomaticas: formData.allowSubstitutes,
        criadorId: Number(user.id),
        tipoJogo:
          formData.gameType === "society"
            ? TipoJogo.SOCIETY
            : formData.gameType === "campo"
            ? TipoJogo.CAMPO
            : TipoJogo.FUTSAL,
        nivelCompetitividade:
          formData.skillLevel === "casual"
            ? NivelCompetitividade.CASUAL
            : formData.skillLevel === "intermediario"
            ? NivelCompetitividade.INTERMEDIARIO
            : NivelCompetitividade.COMPETITIVO,
      };

      const novaSala = await SalasService.criarSala(salaData);
      if (novaSala.data) {
        navigate(`/salas/${novaSala.data.id}`);
      } else {
        throw new Error(novaSala.error || "Erro ao criar sala");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao criar sala. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSelectChange =
    (field: keyof FormData) => (event: SelectChangeEvent) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSwitchChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.checked,
      });
    };

  const handleDateChange = (newDate: Date | null) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título da Sala"
                value={formData.title}
                onChange={handleInputChange("title")}
                required
                placeholder="Ex: Pelada dos Amigos"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={formData.description}
                onChange={handleInputChange("description")}
                multiline
                rows={4}
                placeholder="Descreva os detalhes da sala, regras específicas, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Jogo</InputLabel>
                <Select
                  value={formData.gameType}
                  onChange={handleSelectChange("gameType")}
                  label="Tipo de Jogo"
                >
                  <MenuItem value="society">Society</MenuItem>
                  <MenuItem value="campo">Campo</MenuItem>
                  <MenuItem value="futsal">Futsal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Nível de Habilidade</InputLabel>
                <Select
                  value={formData.skillLevel}
                  onChange={handleSelectChange("skillLevel")}
                  label="Nível de Habilidade"
                >
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="intermediario">Intermediário</MenuItem>
                  <MenuItem value="competitivo">Competitivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <DateTimePicker
                  label="Data e Hora"
                  value={formData.date}
                  onChange={handleDateChange}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Local"
                value={formData.location}
                onChange={handleInputChange("location")}
                required
                placeholder="Nome do local (ex: Arena Soccer Club)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Endereço"
                value={formData.address}
                onChange={handleInputChange("address")}
                required
                placeholder="Endereço completo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Duração (minutos)"
                value={formData.duration}
                onChange={handleInputChange("duration")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">min</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Número Mínimo de Jogadores"
                value={formData.minPlayers}
                onChange={handleInputChange("minPlayers")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Número Máximo de Jogadores"
                value={formData.maxPlayers}
                onChange={handleInputChange("maxPlayers")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Valor por Jogador"
                value={formData.price}
                onChange={handleInputChange("price")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Inscrição</InputLabel>
                <Select
                  value={formData.subscriptionType}
                  onChange={handleSelectChange("subscriptionType")}
                  label="Tipo de Inscrição"
                >
                  <MenuItem value="open">
                    Aberta (qualquer um pode participar)
                  </MenuItem>
                  <MenuItem value="approval">
                    Aprovação (organizador aprova participantes)
                  </MenuItem>
                  <MenuItem value="invite">
                    Convite (apenas convidados podem participar)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.allowSubstitutes}
                    onChange={handleSwitchChange("allowSubstitutes")}
                    color="primary"
                  />
                }
                label="Permitir substituições automáticas"
              />
              <FormHelperText>
                Se ativado, jogadores na lista de espera serão automaticamente
                adicionados quando alguém desistir
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Ao criar a sala, você será o organizador e poderá gerenciar os
                participantes e detalhes.
              </Alert>
            </Grid>
          </Grid>
        );
      default:
        return "Passo desconhecido";
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}15, ${theme.palette.background.paper})`,
          }}
        >
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Criar Nova Sala
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Configure sua sala de futebol e comece a jogar com seus amigos
            </Typography>
          </Box>

          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{ mb: 4 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 4, mb: 3 }}>{getStepContent(activeStep)}</Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 4,
                }}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  minWidth: 120,
                  position: "relative",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : activeStep === steps.length - 1 ? (
                  <>
                    Criar Sala
                    <SportsSoccerIcon sx={{ ml: 1 }} />
                  </>
                ) : (
                  "Próximo"
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CriarSala;
