import {
  Box, Button, CircularProgress, IconButton, InputAdornment, MenuItem, TextField, Tooltip, Typography
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MapIcon from '@mui/icons-material/Map';
import React from 'react';
import { styles } from '../styles';
import { Esporte, TipoPartida } from '../../../../domain/enums';
import { esporteOptions } from '../../../../domain/enums/Esporte';
import { tipoPartidaOptions } from '../../../../domain/enums/TipoPartida';
import { useCriarPartida } from '../hooks/useCriarPartida';

export const PartidaForm: React.FC = () => {
  const {
    form,
    formErrors,
    loading,
    isEdit,
    onChange,
    onUseCurrentLocation,
    onOpenMapPicker,
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

      <TextField
        fullWidth
        label="Localização (Endereço, Quadra, Ponto de Referência)"
        value={form.localizacao}
        onChange={e => onChange('localizacao', e.target.value)}
        sx={styles.textField}
        required
        error={!!formErrors.localizacao}
        helperText={formErrors.localizacao}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon color="action" sx={{ mr: 1 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <Box sx={{ display: 'flex' }}>
              <Tooltip title="Usar localização atual do GPS">
                <IconButton onClick={onUseCurrentLocation} disabled={loading} color="primary" size="small">
                  <GpsFixedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Selecionar no mapa">
                <IconButton onClick={onOpenMapPicker} disabled={loading} color="primary" size="small" sx={{ ml: 1 }}>
                  <MapIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ),
        }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: -2, mb: 1 }}>
        Forneça um endereço ou utilize as opções de localização ao lado.
      </Typography>

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