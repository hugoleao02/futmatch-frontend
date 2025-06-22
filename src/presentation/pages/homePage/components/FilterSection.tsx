import {
  LocationOn as LocationOnIcon,
  Search as SearchIcon,
  SportsSoccer as SportsSoccerIcon,
} from '@mui/icons-material';
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import type { SearchFilters } from '../../../../domain/usecases/interfaces/IHomeUseCase';
import { homeStyles } from '../styles/homeStyles';
import { esporteOptions } from '../../../../domain/enums/Esporte.ts';

interface FilterSectionProps {
  filters: SearchFilters;
  loading: boolean;
  onUpdateFilter: (field: keyof SearchFilters, value: string) => void;
  onSearchMatches: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  loading,
  onUpdateFilter,
  onSearchMatches,
}) => {
  return (
    <Paper elevation={3} sx={homeStyles.section}>
      <Typography variant="h5" component="h2" sx={homeStyles.sectionTitle}>
        Encontre sua Partida
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Localização"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.location}
            onChange={e => onUpdateFilter('location', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: '#555' }} />
                </InputAdornment>
              ),
            }}
            sx={homeStyles.filterInput}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            select
            label="Esporte"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.sport}
            onChange={e => onUpdateFilter('sport', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SportsSoccerIcon sx={{ color: '#555' }} />
                </InputAdornment>
              ),
            }}
            sx={homeStyles.filterInput}
          >
            {esporteOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onSearchMatches}
            disabled={loading}
            sx={homeStyles.searchButton}
            startIcon={<SearchIcon />}
          >
            Buscar Partidas
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
