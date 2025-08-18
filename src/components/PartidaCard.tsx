import {
  Add as AddIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useNavegacao } from '../hooks/useNavegacao';
import type { Partida } from '../types';

interface PartidaCardProps {
  partida: Partida;
  onParticipar?: (partidaId: number) => void;
  mostrarBotaoParticipar?: boolean;
}

export const PartidaCard = ({
  partida,
  onParticipar,
  mostrarBotaoParticipar = true,
}: PartidaCardProps) => {
  const { navegarParaDetalhesPartida } = useNavegacao();

  const lidarComParticipar = () => {
    if (onParticipar) {
      onParticipar(partida.id);
    }
  };

  const lidarComVerDetalhes = () => {
    navegarParaDetalhesPartida(partida.id);
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {partida.nome}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ScheduleIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {new Date(partida.dataHora).toLocaleDateString('pt-BR')} às{' '}
              {new Date(partida.dataHora).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {partida.latitude.toFixed(4)}, {partida.longitude.toFixed(4)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip label={`${partida.totalJogadores} jogadores`} size="small" />
          <Chip label={partida.esporte} size="small" color="primary" />
          <Chip
            label={partida.tipoPartida === 'PUBLICA' ? 'Pública' : 'Privada'}
            size="small"
            color={partida.tipoPartida === 'PUBLICA' ? 'secondary' : 'default'}
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          Criador: {partida.criadorNome}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button size="small" onClick={lidarComVerDetalhes}>
          Ver detalhes
        </Button>

        {mostrarBotaoParticipar && (
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={lidarComParticipar}
            disabled={partida.participantesConfirmados >= partida.totalJogadores}
          >
            Participar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
