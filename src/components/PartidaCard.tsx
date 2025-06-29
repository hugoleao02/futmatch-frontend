import {
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  Lock as LockIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { partidaCardStyles } from '../styles';
import type { Partida } from '../types';

interface PartidaCardProps {
  partida: Partida;
  onParticipar?: (partidaId: number) => void;
}

export const PartidaCard = ({ partida, onParticipar }: PartidaCardProps) => {
  const navigate = useNavigate();

  const handleVerDetalhes = () => {
    navigate(ROUTES.MATCH.DETAILS.replace(':id', partida.id.toString()));
  };

  const handleParticipar = () => {
    if (onParticipar) {
      onParticipar(partida.id);
    }
  };

  const formatarData = (dataHora: string) => {
    return new Date(dataHora).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card sx={partidaCardStyles.card}>
      <CardContent sx={partidaCardStyles.cardContent}>
        <Box sx={partidaCardStyles.header}>
          <Typography variant="h6" component="h2" sx={partidaCardStyles.title}>
            {partida.nome}
          </Typography>
          <Chip
            icon={partida.tipoPartida === 'PUBLICA' ? <PublicIcon /> : <LockIcon />}
            label={partida.tipoPartida === 'PUBLICA' ? 'Pública' : 'Privada'}
            color={partida.tipoPartida === 'PUBLICA' ? 'primary' : 'error'}
            size="small"
          />
        </Box>

        <Box sx={partidaCardStyles.infoContainer}>
          <Typography variant="body2" color="text.secondary" sx={partidaCardStyles.infoItem}>
            <CalendarIcon sx={partidaCardStyles.icon} />
            {formatarData(partida.dataHora)}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={partidaCardStyles.infoItem}>
            <LocationIcon sx={partidaCardStyles.icon} />
            {partida.latitude.toFixed(4)}, {partida.longitude.toFixed(4)}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={partidaCardStyles.infoItem}>
            <GroupIcon sx={partidaCardStyles.icon} />
            {partida.participantesConfirmados}/{partida.totalJogadores} participantes
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Esporte: {partida.esporte}
        </Typography>
      </CardContent>

      <CardActions sx={partidaCardStyles.cardActions}>
        <Button
          size="small"
          variant="outlined"
          onClick={handleVerDetalhes}
          sx={partidaCardStyles.detailsButton}
        >
          Ver Detalhes
        </Button>

        {onParticipar && partida.participantesConfirmados < partida.totalJogadores && (
          <Button size="small" variant="contained" onClick={handleParticipar}>
            Participar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
