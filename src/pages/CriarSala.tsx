import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ptBR from "date-fns/locale/pt-BR";

const CriarSala: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Dados do formulário:", formData);
    navigate("/partidas");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        gutterBottom
        sx={{ textAlign: { xs: "center", sm: "left" } }}
      >
        Criar Nova Sala
      </Typography>

      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título da Partida"
                value={formData.titulo}
                onChange={handleChange("titulo")}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Local"
                value={formData.local}
                onChange={handleChange("local")}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <DatePicker
                  label="Data"
                  value={formData.data}
                  onChange={(newValue) => {
                    setFormData({ ...formData, data: newValue });
                  }}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <TimePicker
                  label="Hora"
                  value={formData.hora}
                  onChange={(newValue) => {
                    setFormData({ ...formData, hora: newValue });
                  }}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="max-jogadores-label">
                  Máximo de Jogadores
                </InputLabel>
                <Select
                  labelId="max-jogadores-label"
                  value={formData.maxJogadores}
                  onChange={handleChange("maxJogadores")}
                  label="Máximo de Jogadores"
                >
                  <MenuItem value={10}>10 jogadores</MenuItem>
                  <MenuItem value={14}>14 jogadores</MenuItem>
                  <MenuItem value={22}>22 jogadores</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="nivel-label">Nível</InputLabel>
                <Select
                  labelId="nivel-label"
                  value={formData.nivel}
                  onChange={handleChange("nivel")}
                  label="Nível"
                >
                  <MenuItem value="iniciante">Iniciante</MenuItem>
                  <MenuItem value="intermediario">Intermediário</MenuItem>
                  <MenuItem value="avancado">Avançado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={formData.descricao}
                onChange={handleChange("descricao")}
                multiline
                rows={4}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <Button
                type="button"
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => navigate("/partidas")}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Criar Sala
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CriarSala;
