import {
  Box, Button, CircularProgress, InputAdornment, MenuItem, TextField, Typography
} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import React from 'react';
import { styles } from '../styles';
import { Esporte, TipoPartida } from '../../../../domain/enums';
import { esporteOptions } from '../../../../domain/enums/Esporte';
import { tipoPartidaOptions } from '../../../../domain/enums/TipoPartida';
import { useCriarPartida } from '../hooks/useCriarPartida';
import { AddressAutocomplete } from './AddressAutocomplete';

export const PartidaForm: React.FC = () => {
  const {
    form,
    formErrors,
    loading,
    isEdit,
    onChange,
    location,
    onSubmit,
    onBack,
  } = useCriarPartida();

  if (loading && !isEdit) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" sx={styles.form} noValidate>
      <TextField
        fullWidth
        label="Nome da Partida"
        value={form.nome}
        onChange={e => onChange('nome', e.target.value)}
        sx={styles.textField}
        required
        error={!!formErrors.nome}
        helperText={formErrors.nome}
      />

      <TextField
        fullWidth
        select
        label="Esporte"
        value={form.esporte}
        onChange={e => onChange('esporte', e.target.value as Esporte)}
        sx={styles.textField}
        required
        error={!!formErrors.esporte}
        helperText={formErrors.esporte}
      >
        {esporteOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>

      <LocationField
        address={location.address}
        latitude={location.latitude}
        fetchingAddress={location.fetchingAddress}
        loading={loading}
        error={!!formErrors.latitude}
        helperText={formErrors.latitude}
        onPlaceSelect={location.onPlaceSelect}
        onClear={location.onClearLocation}
        onUseCurrentLocation={location.useCurrentLocation}
      />

      <Box sx={styles.dateTimeContainer}>
        <TextField
          fullWidth
          label="Data"
          type="date"
          value={form.data}
          onChange={e => onChange('data', e.target.value)}
          sx={styles.dateTimeField}
          InputLabelProps={{ shrink: true }}
          required
          error={!!formErrors.data}
          helperText={formErrors.data}
        />

        <TextField
          fullWidth
          label="Horário"
          type="time"
          value={form.hora}
          onChange={e => onChange('hora', e.target.value)}
          sx={styles.dateTimeField}
          InputLabelProps={{ shrink: true }}
          required
          error={!!formErrors.hora}
          helperText={formErrors.hora}
        />
      </Box>

      <TextField
        fullWidth
        label="Total de Jogadores"
        type="number"
        value={form.totalJogadores}
        onChange={e => onChange('totalJogadores', Number(e.target.value))}
        sx={styles.textField}
        required
        error={!!formErrors.totalJogadores}
        helperText={formErrors.totalJogadores}
        inputProps={{ min: 2, max: 22 }}
      />

      <TextField
        fullWidth
        select
        label="Tipo de Partida"
        value={form.tipoPartida}
        onChange={e => onChange('tipoPartida', e.target.value as TipoPartida)}
        sx={styles.textField}
        required
        error={!!formErrors.tipoPartida}
        helperText={formErrors.tipoPartida}
      >
        {tipoPartidaOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack} sx={{ flex: 1 }}>
          Voltar
        </Button>
        <Button variant="contained" onClick={onSubmit} sx={{ flex: 1 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Salvar' : 'Criar')}
        </Button>
      </Box>
    </Box>
  );
};

/* ---- Sub-componente: campo de localização com autocomplete + GPS ---- */

const LocationField: React.FC<{
  address: string;
  latitude: number | '';
  fetchingAddress: boolean;
  loading: boolean;
  error?: boolean;
  helperText?: string;
  onPlaceSelect: import('../../../../infra/services/geocoding').PlaceSuggestion extends infer P
    ? (p: P) => void
    : never;
  onClear: () => void;
  onUseCurrentLocation: () => void;
}> = ({ address, fetchingAddress, loading, error, helperText, onPlaceSelect, onClear, onUseCurrentLocation }) => (
  <Box sx={styles.textField}>
    <AddressAutocomplete
      value={address}
      onChange={onPlaceSelect}
      onClear={onClear}
      error={error}
      helperText={helperText}
      loading={fetchingAddress || loading}
    />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
      <Button
        size="small"
        startIcon={<GpsFixedIcon />}
        onClick={onUseCurrentLocation}
        disabled={loading || fetchingAddress}
        variant="outlined"
        sx={{
          color: '#1B5E20',
          borderColor: '#1B5E20',
          fontSize: '0.75rem',
          '&:hover': {
            borderColor: '#2E7D32',
            bgcolor: '#f1f8e9',
          },
        }}
      >
        Usar minha localização atual
      </Button>
    </Box>
  </Box>
);
