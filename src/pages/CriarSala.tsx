import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalasService, CriarSalaDTO } from "../infrastructure/services";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CriarSala: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    localizacao: "",
    capacidade: "10",
  });

  const salasService = new SalasService();

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const salaData: CriarSalaDTO = {
        nome: formData.nome,
        descricao: formData.descricao,
        localizacao: formData.localizacao,
        capacidade: parseInt(formData.capacidade, 10),
      };

      const novaSala = await salasService.criarSala(salaData);

      // Redirecionar para a página da sala criada
      navigate(`/dashboard/salas/${novaSala.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar sala");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            Criar Nova Sala
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome da Sala"
            variant="outlined"
            margin="normal"
            required
            value={formData.nome}
            onChange={handleChange("nome")}
          />

          <TextField
            fullWidth
            label="Descrição"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            value={formData.descricao}
            onChange={handleChange("descricao")}
          />

          <TextField
            fullWidth
            label="Localização"
            variant="outlined"
            margin="normal"
            required
            value={formData.localizacao}
            onChange={handleChange("localizacao")}
          />

          <TextField
            fullWidth
            label="Capacidade"
            variant="outlined"
            margin="normal"
            required
            type="number"
            inputProps={{ min: 2 }}
            value={formData.capacidade}
            onChange={handleChange("capacidade")}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : "Criar Sala"}
          </Button>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default CriarSala;
