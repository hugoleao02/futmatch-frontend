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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ptBR from "date-fns/locale/pt-BR";

const CriarSala: React.FC = () => {
  const navigate = useNavigate();
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
    // Aqui você implementará a lógica para criar a sala
    console.log("Dados do formulário:", formData);
    navigate("/partidas");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Nova Sala
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} md={6}>
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
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
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
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número Máximo de Jogadores"
                type="number"
                value={formData.maxJogadores}
                onChange={handleChange("maxJogadores")}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Nível</InputLabel>
                <Select
                  value={formData.nivel}
                  label="Nível"
                  onChange={handleChange("nivel")}
                >
                  <MenuItem value="Iniciante">Iniciante</MenuItem>
                  <MenuItem value="Intermediário">Intermediário</MenuItem>
                  <MenuItem value="Avançado">Avançado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                multiline
                rows={4}
                value={formData.descricao}
                onChange={handleChange("descricao")}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/partidas")}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Criar Sala
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CriarSala;
