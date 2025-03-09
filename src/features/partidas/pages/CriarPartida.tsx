import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
  FormControlLabel,
  Switch,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { criarPartida } from "../services/partidasService";
import { CriarPartidaDTO } from "../../../@types";
const steps = ["Informações Básicas", "Local e Horário", "Configurações"];

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
}

const initialFormData: FormData = {
  title: "",
  description: "",
  date: null,
  location: "",
  address: "",
  maxPlayers: 14,
  minPlayers: 10,
  price: "",
  gameType: "society",
  duration: 60,
  skillLevel: "casual",
};

const CriarPartida: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Validação do formulário
  const validationSchema = [
    // Etapa 1: Informações Básicas
    Yup.object({
      title: Yup.string().required("O título da partida é obrigatório"),
      location: Yup.string().required("O local da partida é obrigatório"),
      date: Yup.date()
        .required("A data e hora são obrigatórias")
        .min(new Date(), "A data deve ser no futuro"),
      description: Yup.string().max(
        500,
        "A descrição deve ter no máximo 500 caracteres"
      ),
    }),
    // Etapa 2: Configurações
    Yup.object({
      maxPlayers: Yup.number()
        .required("O número máximo de jogadores é obrigatório")
        .min(2, "Mínimo de 2 jogadores")
        .max(22, "Máximo de 22 jogadores"),
      skillLevel: Yup.string().required("O nível de habilidade é obrigatório"),
      duration: Yup.number()
        .required("A duração da partida é obrigatória")
        .min(30, "Mínimo de 30 minutos")
        .max(180, "Máximo de 180 minutos"),
      price: Yup.number().min(0, "O valor não pode ser negativo").nullable(),
      gameType: Yup.string().required("O tipo de inscrição é obrigatório"),
    }),
  ];

  // Configuração do formulário com Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: new Date(new Date().setHours(new Date().getHours() + 1)),
      location: "",
      address: "",
      maxPlayers: 10,
      skillLevel: "INTERMEDIARIO",
      duration: 90,
      price: "0",
      gameType: "ABERTA",
      minPlayers: 10,
    },
    validationSchema: validationSchema[activeStep],
    onSubmit: async (values) => {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
        return;
      }

      // Envio do formulário
      try {
        setLoading(true);
        const partidaData: CriarPartidaDTO = {
          titulo: values.title,
          data: values.date?.toISOString() || "",
          local: values.location,
          maxJogadores: values.maxPlayers,
          nivelHabilidade: values.skillLevel,
          observacoes: values.description,
        };

        await criarPartida(partidaData);
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard/partidas");
        }, 2000);
      } catch (err) {
        console.error("Erro ao criar partida:", err);
        setError("Ocorreu um erro ao criar a partida. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    formik.resetForm();
  };

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

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você implementaria a lógica para criar a partida
    console.log(formData);
    navigate("/dashboard/partidas");
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

  const handleDateChange = (newDate: Date | null) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título da Partida"
                value={formData.title}
                onChange={handleInputChange("title")}
                error={formData.title === ""}
                helperText={
                  formData.title === "" ? "O título é obrigatório" : undefined
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={formData.description}
                onChange={handleInputChange("description")}
                error={formData.description === ""}
                helperText={
                  formData.description === ""
                    ? "A descrição é obrigatória"
                    : undefined
                }
                multiline
                rows={4}
                placeholder="Descreva os detalhes da partida, regras especiais, etc."
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
                  <MenuItem value="ABERTA">
                    Aberta (qualquer um pode participar)
                  </MenuItem>
                  <MenuItem value="APROVACAO">
                    Aprovação (organizador aprova participantes)
                  </MenuItem>
                  <MenuItem value="CONVITE">
                    Convite (apenas convidados podem participar)
                  </MenuItem>
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
                  <MenuItem value="INICIANTE">Iniciante</MenuItem>
                  <MenuItem value="INTERMEDIARIO">Intermediário</MenuItem>
                  <MenuItem value="AVANCADO">Avançado</MenuItem>
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
                error={formData.location === ""}
                helperText={
                  formData.location === "" ? "O local é obrigatório" : undefined
                }
                required
                placeholder="Nome do local (ex: Arena Soccer Club)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Endereço"
                value={formData.address}
                onChange={handleInputChange("address")}
                error={formData.address === ""}
                helperText={
                  formData.address === ""
                    ? "O endereço é obrigatório"
                    : undefined
                }
                required
                placeholder="Endereço completo"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Duração (minutos)"
                value={formData.duration}
                onChange={handleInputChange("duration")}
                error={formData.duration < 30 || formData.duration > 180}
                helperText={
                  formData.duration < 30
                    ? "Mínimo de 30 minutos"
                    : formData.duration > 180
                    ? "Máximo de 180 minutos"
                    : undefined
                }
                InputProps={{
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
                error={formData.minPlayers < 2 || formData.minPlayers > 22}
                helperText={
                  formData.minPlayers < 2
                    ? "Mínimo de 2 jogadores"
                    : formData.minPlayers > 22
                    ? "Máximo de 22 jogadores"
                    : undefined
                }
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
                error={formData.maxPlayers < 2 || formData.maxPlayers > 22}
                helperText={
                  formData.maxPlayers < 2
                    ? "Mínimo de 2 jogadores"
                    : formData.maxPlayers > 22
                    ? "Máximo de 22 jogadores"
                    : undefined
                }
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
                error={formData.price === ""}
                helperText={
                  formData.price === "" ? "O valor é obrigatório" : undefined
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                O valor total será dividido igualmente entre todos os
                participantes.
              </Alert>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, left: 16 }}
          onClick={() => navigate("/dashboard/partidas")}
          aria-label="voltar"
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ textAlign: "center", mb: 4, mt: isMobile ? 4 : 0 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Criar Nova Partida
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Organize sua partida e convide seus amigos
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: 60, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                Partida criada com sucesso!
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Sua partida foi criada e já está disponível para os jogadores.
              </Typography>
              <Button
                onClick={() => navigate("/dashboard/partidas")}
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 1 }}
              >
                Ver Partidas
              </Button>
              <Button onClick={handleReset} variant="outlined" sx={{ mt: 2 }}>
                Criar Outra Partida
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              {renderStepContent(activeStep)}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{ borderRadius: 2 }}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : activeStep === steps.length - 1 ? (
                    <SportsSoccerIcon />
                  ) : (
                    "Próximo"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Partida criada com sucesso! Redirecionando...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CriarPartida;
