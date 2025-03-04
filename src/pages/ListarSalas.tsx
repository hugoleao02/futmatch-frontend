import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Alert,
  Pagination,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import apiService from "../services/apiService";
import { Sala, FiltroSalaDTO } from "../types/api";
import SalaCard from "../components/salas/SalaCard";
import SalaFiltros from "../components/salas/SalaFiltros";
import SalaEmptyState from "../components/salas/SalaEmptyState";
import SalaSkeleton from "../components/salas/SalaSkeleton";

const ListarSalas: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [filtros, setFiltros] = useState<FiltroSalaDTO>({
    localizacao: "",
    nivelMinimo: undefined,
    nivelMaximo: undefined,
    minimoFairPlay: undefined,
    isPublica: true,
  });

  const carregarSalas = async () => {
    setLoading(true);
    setError(null);

    try {
      let resultado;

      // Se tiver filtros ativos, usa a busca com filtros
      if (
        searchTerm ||
        filtros.localizacao ||
        filtros.nivelMinimo !== undefined ||
        filtros.nivelMaximo !== undefined ||
        filtros.minimoFairPlay !== undefined
      ) {
        const filtrosAplicados: FiltroSalaDTO = {
          ...filtros,
        };

        if (searchTerm) {
          filtrosAplicados.localizacao = searchTerm;
        }

        resultado = await apiService.salas.filtrarSalas(filtrosAplicados);
      } else {
        // Caso contrário, lista todas as salas ativas
        resultado = await apiService.salas.listarSalasAtivas();
      }

      setSalas(resultado);
      setTotalPages(Math.ceil(resultado.length / 6)); // 6 salas por página
    } catch (err: any) {
      console.error("Erro ao carregar salas:", err);
      setError(
        err.response?.data?.message ||
          "Erro ao carregar salas. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSalas();
  }, []);

  const handleSearch = () => {
    carregarSalas();
  };

  const handleFilterChange = (field: keyof FiltroSalaDTO, value: any) => {
    setFiltros({
      ...filtros,
      [field]: value,
    });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCriarSala = () => {
    navigate("/criar-sala");
  };

  const handleVerSala = (salaId: number) => {
    navigate(`/salas/${salaId}`);
  };

  const limparFiltros = () => {
    setFiltros({
      localizacao: "",
      nivelMinimo: undefined,
      nivelMaximo: undefined,
      minimoFairPlay: undefined,
      isPublica: true,
    });
    setSearchTerm("");
  };

  const limparEBuscar = () => {
    limparFiltros();
    carregarSalas();
  };

  // Paginação das salas
  const salasPaginadas = salas.slice((page - 1) * 6, page * 6);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("Salas Disponíveis")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCriarSala}
        >
          {t("Criar Sala")}
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <SalaFiltros
          filtros={filtros}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClearFilters={limparFiltros}
          onRefresh={carregarSalas}
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Grid container spacing={3}>
          <SalaSkeleton count={6} />
        </Grid>
      ) : salas.length === 0 ? (
        <SalaEmptyState onRefresh={limparEBuscar} />
      ) : (
        <>
          <Grid container spacing={3}>
            {salasPaginadas.map((sala) => (
              <Grid item xs={12} sm={6} md={4} key={sala.id}>
                <SalaCard sala={sala} onVerDetalhes={handleVerSala} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ListarSalas;
