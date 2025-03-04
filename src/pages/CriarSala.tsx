import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Alert,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ptBR from "date-fns/locale/pt-BR";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const CriarSala: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    titulo: "",
    local: "",
    data: null,
    hora: null,
    maxJogadores: "",
    nivel: "",
    descricao: "",
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Dados do formulário:", formData);
    navigate("/partidas");
  };

  const steps = ["Informações Básicas", "Detalhes da Partida", "Revisão"];

  const isStepOneValid = () => {
    return formData.titulo !== "" && formData.local !== "";
  };

  const isStepTwoValid = () => {
    return (
      formData.data !== null &&
      formData.hora !== null &&
      formData.maxJogadores !== "" &&
      formData.nivel !== ""
    );
  };

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case "iniciante":
        return "Iniciante";
      case "intermediario":
        return "Intermediário";
      case "avancado":
        return "Avançado";
      default:
        return "";
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "iniciante":
        return "success";
      case "intermediario":
        return "primary";
      case "avancado":
        return "secondary";
      default:
        return "default";
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "medium", mb: 3 }}
            >
              Informações Básicas da Partida
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <SportsSoccerIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Título da Partida
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Ex: Pelada no Parque"
                      value={formData.titulo}
                      onChange={handleChange("titulo")}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <LocationOnIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Local da Partida
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Ex: Quadra do Parque Central"
                      value={formData.local}
                      onChange={handleChange("local")}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "medium", mb: 3 }}
            >
              Detalhes da Partida
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <AccessTimeIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Data da Partida
                    </Typography>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={ptBR}
                    >
                      <DatePicker
                        value={formData.data}
                        onChange={(newValue) => {
                          setFormData({ ...formData, data: newValue });
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <AccessTimeIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Horário
                    </Typography>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={ptBR}
                    >
                      <TimePicker
                        value={formData.hora}
                        onChange={(newValue) => {
                          setFormData({ ...formData, hora: newValue });
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <GroupIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Máximo de Jogadores
                    </Typography>
                    <FormControl fullWidth required>
                      <Select
                        value={formData.maxJogadores}
                        onChange={handleChange("maxJogadores")}
                        displayEmpty
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="" disabled>
                          Selecione a quantidade
                        </MenuItem>
                        <MenuItem value={10}>10 jogadores</MenuItem>
                        <MenuItem value={14}>14 jogadores</MenuItem>
                        <MenuItem value={22}>22 jogadores</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <FitnessCenterIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Nível da Partida
                    </Typography>
                    <FormControl fullWidth required>
                      <Select
                        value={formData.nivel}
                        onChange={handleChange("nivel")}
                        displayEmpty
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="" disabled>
                          Selecione o nível
                        </MenuItem>
                        <MenuItem value="iniciante">Iniciante</MenuItem>
                        <MenuItem value="intermediario">Intermediário</MenuItem>
                        <MenuItem value="avancado">Avançado</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.primary.light}20`,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <DescriptionIcon />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Descrição (opcional)
                      </Typography>
                      <Tooltip title="Adicione informações adicionais como regras específicas, equipamentos necessários, etc.">
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      fullWidth
                      placeholder="Descreva detalhes adicionais sobre a partida..."
                      value={formData.descricao}
                      onChange={handleChange("descricao")}
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "medium", mb: 3 }}
            >
              Revisão da Partida
            </Typography>

            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              Verifique os detalhes da sua partida antes de criar a sala
            </Alert>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Título
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {formData.titulo}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Local
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon
                      sx={{ mr: 1, color: theme.palette.primary.main }}
                    />
                    <Typography variant="body1">{formData.local}</Typography>
                  </Box>
                </Box>

                <Divider />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Data
                    </Typography>
                    <Typography variant="body1">
                      {formData.data
                        ? new Date(formData.data).toLocaleDateString("pt-BR")
                        : ""}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Horário
                    </Typography>
                    <Typography variant="body1">
                      {formData.hora
                        ? new Date(formData.hora).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Máximo de Jogadores
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <GroupIcon
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
                      <Typography variant="body1">
                        {formData.maxJogadores} jogadores
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Nível
                    </Typography>
                    <Chip
                      label={getNivelLabel(formData.nivel)}
                      color={getNivelColor(formData.nivel) as any}
                      size="medium"
                      sx={{ fontWeight: "medium" }}
                    />
                  </Grid>
                </Grid>

                {formData.descricao && (
                  <>
                    <Divider />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Descrição
                      </Typography>
                      <Typography variant="body1">
                        {formData.descricao}
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </Paper>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          py: { xs: 4, sm: 5 },
          px: { xs: 2, sm: 3 },
          mb: { xs: 4, sm: 5 },
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 0, sm: "0 0 24px 24px" },
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate("/partidas")}
              sx={{ mr: 2, bgcolor: "rgba(255,255,255,0.1)" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              sx={{
                fontWeight: "bold",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              Criar Nova Partida
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ opacity: 0.9, ml: { xs: 0, sm: 7 }, mt: 1 }}
          >
            Preencha os dados para criar uma nova partida de futebol
          </Typography>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 180,
            height: 180,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
      </Box>

      <Container maxWidth="md">
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
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
            <Box sx={{ mb: 4 }}>{renderStepContent(activeStep)}</Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={
                  activeStep === 0 ? () => navigate("/partidas") : handleBack
                }
                sx={{
                  borderRadius: 2,
                  px: 3,
                }}
              >
                {activeStep === 0 ? "Cancelar" : "Voltar"}
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Criar Sala
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !isStepOneValid()) ||
                      (activeStep === 1 && !isStepTwoValid())
                    }
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      fontWeight: "medium",
                    }}
                  >
                    Próximo
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CriarSala;
