import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";
import { FiltroSalaDTO } from "../../infrastructure/services";

interface SalaFiltrosProps {
  filtros: FiltroSalaDTO;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onFilterChange: (field: keyof FiltroSalaDTO, value: any) => void;
  onSearch: () => void;
  onClearFilters: () => void;
  onRefresh: () => void;
}

const SalaFiltros: React.FC<SalaFiltrosProps> = ({
  filtros,
  searchTerm,
  onSearchTermChange,
  onFilterChange,
  onSearch,
  onClearFilters,
  onRefresh,
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          placeholder={t("Buscar por localização...")}
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ mr: 1 }}
        >
          {showFilters ? t("Ocultar Filtros") : t("Mostrar Filtros")}
        </Button>

        <Tooltip title={t("Atualizar")}>
          <IconButton onClick={onRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      {showFilters && (
        <>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>{t("Nível Mínimo")}</InputLabel>
              <Select
                value={filtros.nivelMinimo || ""}
                onChange={(e) => onFilterChange("nivelMinimo", e.target.value)}
                label={t("Nível Mínimo")}
              >
                <MenuItem value="">{t("Qualquer")}</MenuItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>{t("Nível Máximo")}</InputLabel>
              <Select
                value={filtros.nivelMaximo || ""}
                onChange={(e) => onFilterChange("nivelMaximo", e.target.value)}
                label={t("Nível Máximo")}
              >
                <MenuItem value="">{t("Qualquer")}</MenuItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>{t("Mínimo Fair Play")}</InputLabel>
              <Select
                value={filtros.minimoFairPlay || ""}
                onChange={(e) =>
                  onFilterChange("minimoFairPlay", e.target.value)
                }
                label={t("Mínimo Fair Play")}
              >
                <MenuItem value="">{t("Qualquer")}</MenuItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClearFilters}
                sx={{ mr: 1 }}
              >
                {t("Limpar")}
              </Button>
              <Button variant="contained" color="primary" onClick={onSearch}>
                {t("Filtrar")}
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SalaFiltros;
