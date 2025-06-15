import { Box, Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { styles } from '../styles';
import { Esporte, TipoPartida } from '../../../../domain/enums';

interface PartidaFormProps {
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  data: string;
  hora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  loading: boolean;
  isEdit: boolean;
  onNomeChange: (value: string) => void;
  onEsporteChange: (value: Esporte) => void;
  onLatitudeChange: (value: number) => void;
  onLongitudeChange: (value: number) => void;
  onDataChange: (value: string) => void;
  onHoraChange: (value: string) => void;
  onTotalJogadoresChange: (value: number) => void;
  onTipoPartidaChange: (value: TipoPartida) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const PartidaForm: React.FC<PartidaFormProps> = ({
  nome,
  esporte,
  latitude,
  longitude,
  data,
  hora,
  totalJogadores,
  tipoPartida,
  loading,
  isEdit,
  onNomeChange,
  onEsporteChange,
  onLatitudeChange,
  onLongitudeChange,
  onDataChange,
  onHoraChange,
  onTotalJogadoresChange,
  onTipoPartidaChange,
  onSubmit,
  onBack,
}) => {
  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" sx={styles.form} noValidate>
      <TextField
        fullWidth
        label="Nome da Partida"
        value={nome}
        onChange={e => onNomeChange(e.target.value)}
        sx={styles.textField}
        required
      />

      <TextField
        fullWidth
        select
        label="Esporte"
        value={esporte}
        onChange={e => onEsporteChange(e.target.value as Esporte)}
        sx={styles.textField}
        required
      >
        <MenuItem value={Esporte.FUTEBOL}>Futebol</MenuItem>
        <MenuItem value={Esporte.FUTSAL}>Futsal</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Latitude"
        type="number"
        value={latitude}
        onChange={e => onLatitudeChange(Number(e.target.value))}
        sx={styles.textField}
        required
      />

      <TextField
        fullWidth
        label="Longitude"
        type="number"
        value={longitude}
        onChange={e => onLongitudeChange(Number(e.target.value))}
        sx={styles.textField}
        required
      />

      <Box sx={styles.dateTimeContainer}>
        <TextField
          fullWidth
          label="Data"
          type="date"
          value={data}
          onChange={e => onDataChange(e.target.value)}
          sx={styles.dateTimeField}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <TextField
          fullWidth
          label="Horário"
          type="time"
          value={hora}
          onChange={e => onHoraChange(e.target.value)}
          sx={styles.dateTimeField}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Box>

      <TextField
        fullWidth
        label="Total de Jogadores"
        type="number"
        value={totalJogadores}
        onChange={e => onTotalJogadoresChange(Number(e.target.value))}
        sx={styles.textField}
        required
      />

      <TextField
        fullWidth
        select
        label="Tipo de Partida"
        value={tipoPartida}
        onChange={e => onTipoPartidaChange(e.target.value as TipoPartida)}
        sx={styles.textField}
        required
      >
        <MenuItem value={TipoPartida.PUBLICA}>Pública</MenuItem>
        <MenuItem value={TipoPartida.PRIVADA}>Privada</MenuItem>
      </TextField>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack} sx={{ flex: 1 }}>
          Voltar
        </Button>
        <Button variant="contained" onClick={onSubmit} sx={{ flex: 1 }}>
          {isEdit ? 'Salvar' : 'Criar'}
        </Button>
      </Box>
    </Box>
  );
};
