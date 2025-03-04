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
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CriarPartidaDTO } from "../types/api";
import { apiService } from "../services/apiService";

// Passos do formulário
const steps = ["Informações Básicas", "Configurações", "Confirmação"];

const CriarPartida: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  // Validação do formulário
  const validationSchema = [
    // Etapa 1: Informações Básicas
    Yup.object({
      titulo: Yup.string().required("O título da partida é obrigatório"),
      local: Yup.string().required("O local da partida é obrigatório"),
      dataHora: Yup.date()
        .required("A data e hora são obrigatórias")
        .min(new Date(), "A data deve ser no futuro"),
      descricao: Yup.string().max(
        500,
        "A descrição deve ter no máximo 500 caracteres"
      ),
    }),
    // Etapa 2: Configurações
    Yup.object({
      maxJogadores: Yup.number()
        .required("O número máximo de jogadores é obrigatório")
        .min(2, "Mínimo de 2 jogadores")
        .max(22, "Máximo de 22 jogadores"),
      nivelHabilidade: Yup.string().required(
        "O nível de habilidade é obrigatório"
      ),
      duracaoMinutos: Yup.number()
        .required("A duração da partida é obrigatória")
        .min(30, "Mínimo de 30 minutos")
        .max(180, "Máximo de 180 minutos"),
      valorPorJogador: Yup.number()
        .min(0, "O valor não pode ser negativo")
        .nullable(),
      tipoInscricao: Yup.string().required("O tipo de inscrição é obrigatório"),
    }),
  ];

  // Configuração do formulário com Formik
  const formik = useFormik({
    initialValues: {
      titulo: "",
      local: "",
      dataHora: new Date(new Date().setHours(new Date().getHours() + 1)),
      descricao: "",
      maxJogadores: 10,
      nivelHabilidade: "INTERMEDIARIO",
      duracaoMinutos: 90,
      valorPorJogador: 0,
      tipoInscricao: "ABERTA",
      permitirSubstituicoes: true,
      coordenadas: {
        latitude: 0,
        longitude: 0,
      },
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
          titulo: values.titulo,
          local: values.local,
          dataHora: values.dataHora.toISOString(),
          descricao: values.descricao,
          maxJogadores: values.maxJogadores,
          nivelHabilidade: values.nivelHabilidade,
          duracaoMinutos: values.duracaoMinutos,
          valorPorJogador: values.valorPorJogador || 0,
          tipoInscricao: values.tipoInscricao,
          permitirSubstituicoes: values.permitirSubstituicoes,
          coordenadas: values.coordenadas,
        };

        await apiService.criarPartida(partidaData);
        setSuccess(true);
        setTimeout(() => {
          navigate("/partidas");
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

  // Renderização dos passos do formulário
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Informações Básicas da Partida
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="titulo"
                  name="titulo"
                  label="Título da Partida"
                  value={formik.values.titulo}
                  onChange={formik.handleChange}
                  error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                  helperText={formik.touched.titulo && formik.errors.titulo}
                  placeholder="Ex: Pelada de Quarta no Parque"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="local"
                  name="local"
                  label="Local da Partida"
                  value={formik.values.local}
                  onChange={formik.handleChange}
                  error={formik.touched.local && Boolean(formik.errors.local)}
                  helperText={formik.touched.local && formik.errors.local}
                  placeholder="Ex: Quadra do Parque da Cidade"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ptBR}
                >
                  <DateTimePicker
                    label="Data e Hora"
                    value={formik.values.dataHora}
                    onChange={(newValue) => {
                      formik.setFieldValue("dataHora", newValue);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          formik.touched.dataHora &&
                          Boolean(formik.errors.dataHora),
                        helperText:
                          formik.touched.dataHora &&
                          (formik.errors.dataHora as string),
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon color="action" />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="descricao"
                  name="descricao"
                  label="Descrição (opcional)"
                  multiline
                  rows={4}
                  value={formik.values.descricao}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.descricao && Boolean(formik.errors.descricao)
                  }
                  helperText={
                    formik.touched.descricao && formik.errors.descricao
                  }
                  placeholder="Descreva detalhes sobre a partida, regras específicas, etc."
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configurações da Partida
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="maxJogadores"
                  name="maxJogadores"
                  label="Máximo de Jogadores"
                  type="number"
                  value={formik.values.maxJogadores}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.maxJogadores &&
                    Boolean(formik.errors.maxJogadores)
                  }
                  helperText={
                    formik.touched.maxJogadores && formik.errors.maxJogadores
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="duracaoMinutos"
                  name="duracaoMinutos"
                  label="Duração (minutos)"
                  type="number"
                  value={formik.values.duracaoMinutos}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.duracaoMinutos &&
                    Boolean(formik.errors.duracaoMinutos)
                  }
                  helperText={
                    formik.touched.duracaoMinutos &&
                    formik.errors.duracaoMinutos
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.nivelHabilidade &&
                    Boolean(formik.errors.nivelHabilidade)
                  }
                >
                  <InputLabel id="nivelHabilidade-label">
                    Nível de Habilidade
                  </InputLabel>
                  <Select
                    labelId="nivelHabilidade-label"
                    id="nivelHabilidade"
                    name="nivelHabilidade"
                    value={formik.values.nivelHabilidade}
                    onChange={formik.handleChange}
                    label="Nível de Habilidade"
                  >
                    <MenuItem value="INICIANTE">Iniciante</MenuItem>
                    <MenuItem value="INTERMEDIARIO">Intermediário</MenuItem>
                    <MenuItem value="AVANCADO">Avançado</MenuItem>
                  </Select>
                  {formik.touched.nivelHabilidade &&
                    formik.errors.nivelHabilidade && (
                      <FormHelperText>
                        {formik.errors.nivelHabilidade}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="valorPorJogador"
                  name="valorPorJogador"
                  label="Valor por Jogador (R$)"
                  type="number"
                  value={formik.values.valorPorJogador}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.valorPorJogador &&
                    Boolean(formik.errors.valorPorJogador)
                  }
                  helperText={
                    formik.touched.valorPorJogador &&
                    formik.errors.valorPorJogador
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.tipoInscricao &&
                    Boolean(formik.errors.tipoInscricao)
                  }
                >
                  <InputLabel id="tipoInscricao-label">
                    Tipo de Inscrição
                  </InputLabel>
                  <Select
                    labelId="tipoInscricao-label"
                    id="tipoInscricao"
                    name="tipoInscricao"
                    value={formik.values.tipoInscricao}
                    onChange={formik.handleChange}
                    label="Tipo de Inscrição"
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
                  {formik.touched.tipoInscricao &&
                    formik.errors.tipoInscricao && (
                      <FormHelperText>
                        {formik.errors.tipoInscricao}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.permitirSubstituicoes}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "permitirSubstituicoes",
                          e.target.checked
                        )
                      }
                      name="permitirSubstituicoes"
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
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Confirme os Detalhes da Partida
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {formik.values.titulo}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {formik.values.local}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {formik.values.dataHora.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Máximo de Jogadores
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formik.values.maxJogadores} jogadores
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Duração
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formik.values.duracaoMinutos} minutos
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Nível de Habilidade
                  </Typography>
                  <Chip
                    label={getNivelHabilidadeLabel(
                      formik.values.nivelHabilidade
                    )}
                    color={
                      formik.values.nivelHabilidade === "INICIANTE"
                        ? "success"
                        : formik.values.nivelHabilidade === "AVANCADO"
                        ? "secondary"
                        : "primary"
                    }
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Valor por Jogador
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formik.values.valorPorJogador
                      ? `R$ ${formik.values.valorPorJogador.toFixed(2)}`
                      : "Gratuito"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Tipo de Inscrição
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {getTipoInscricaoLabel(formik.values.tipoInscricao)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Substituições Automáticas
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formik.values.permitirSubstituicoes
                      ? "Ativadas"
                      : "Desativadas"}
                  </Typography>
                </Grid>
                {formik.values.descricao && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Descrição
                    </Typography>
                    <Typography variant="body1">
                      {formik.values.descricao}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
            <Alert severity="info" sx={{ mb: 2 }}>
              Ao confirmar, você será o organizador desta partida e poderá
              gerenciar os participantes e detalhes.
            </Alert>
          </Box>
        );
      default:
        return "Passo desconhecido";
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
          onClick={() => navigate("/partidas")}
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
            Preencha os detalhes para organizar sua partida de futebol
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
                onClick={() => navigate("/partidas")}
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
            <form onSubmit={formik.handleSubmit}>
              {getStepContent(activeStep)}
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
                    "Criar Partida"
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
