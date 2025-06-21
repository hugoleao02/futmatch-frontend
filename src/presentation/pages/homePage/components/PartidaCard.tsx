import {
  CalendarToday as CalendarTodayIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  LocationOn as LocationOnIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  SportsSoccer as SportsSoccerIcon,
} from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TipoPartida } from '../../../../domain/enums';
import type { PartidaResponse } from '../../../../domain/types';
import { homeStyles } from '../styles/homeStyles';

interface PartidaCardProps {
  partida: PartidaResponse;
  onMatchDetailsClick: (matchId: string) => void;
  onOpenRecapModal: (matchName: string) => void;
}

export const PartidaCard: React.FC<PartidaCardProps> = ({ partida, onMatchDetailsClick }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/match/edit?id=${partida.id}`);
  };

  // Separar data e hora
  const [date, time] = partida.dataHora
    ? new Date(partida.dataHora).toLocaleDateString('pt-BR').split('T')
    : ['', ''];

  // Participantes
  const currentPlayers = partida.participantes ? partida.participantes.length : 0;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card elevation={3} sx={homeStyles.matchCard}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" component="div" sx={homeStyles.cardTitle}>
              {partida.nome}
            </Typography>
            <Typography
              variant="body2"
              color={partida.tipoPartida === TipoPartida.PUBLICA ? 'primary' : 'error'}
              sx={{ fontWeight: 'bold' }}
            >
              {partida.tipoPartida === TipoPartida.PUBLICA ? (
                <PublicIcon sx={homeStyles.icon} />
              ) : (
                <LockIcon sx={homeStyles.icon} />
              )}
              {partida.tipoPartida === TipoPartida.PUBLICA ? 'Pública' : 'Privada'}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <SportsSoccerIcon sx={homeStyles.icon} />
            {partida.esporte}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <CalendarTodayIcon sx={homeStyles.icon} />
            {date} {time && `às ${time.substring(0, 5)}`}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <GroupIcon sx={homeStyles.icon} />
            Vagas: {currentPlayers}/{partida.totalJogadores} (
            <strong>{partida.totalJogadores - currentPlayers} restantes</strong>)
          </Typography>

          {/* Se quiser mostrar localização, pode exibir latitude/longitude */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 'medium' }}>
            <LocationOnIcon sx={homeStyles.icon} />
            {`Lat: ${partida.latitude}, Lon: ${partida.longitude}`}
          </Typography>
        </CardContent>

        <CardActions sx={homeStyles.cardActions}>
          {/* Se não tiver status, pode remover ou ajustar essa lógica */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              sx={homeStyles.editButton}
              onClick={handleEditClick}
              startIcon={<EditIcon />}
            >
              Editar
            </Button>
            <Button
              size="small"
              sx={homeStyles.detailsButton}
              onClick={() => onMatchDetailsClick(partida.id)}
            >
              Ver Detalhes
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};
