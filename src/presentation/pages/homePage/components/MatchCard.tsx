import {
  CalendarToday as CalendarTodayIcon,
  Edit as EditIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  LocationOn as LocationOnIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  SportsSoccer as SportsSoccerIcon,
} from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Match } from '../../../../core/usecases/interfaces/IHomeUseCase';
import { homeStyles } from '../styles/homeStyles';

interface MatchCardProps {
  match: Match;
  onMatchDetailsClick: (matchId: string) => void;
  onOpenRecapModal: (matchName: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onMatchDetailsClick,
  onOpenRecapModal,
}) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/match/edit?id=${match.id}`);
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card elevation={3} sx={homeStyles.matchCard}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" component="div" sx={homeStyles.cardTitle}>
              {match.name}
            </Typography>
            <Typography
              variant="body2"
              color={match.type === 'Pública' ? 'primary' : 'error'}
              sx={{ fontWeight: 'bold' }}
            >
              {match.type === 'Pública' ? (
                <PublicIcon sx={homeStyles.icon} />
              ) : (
                <LockIcon sx={homeStyles.icon} />
              )}
              {match.type}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <SportsSoccerIcon sx={homeStyles.icon} />
            {match.sport} - {match.location}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <CalendarTodayIcon sx={homeStyles.icon} />
            {match.date} às {match.time}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <GroupIcon sx={homeStyles.icon} />
            Vagas: {match.currentPlayers}/{match.totalPlayers} (
            <strong>{match.totalPlayers - match.currentPlayers} restantes</strong>)
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 'medium' }}>
            <LocationOnIcon sx={homeStyles.icon} />
            {match.distance} daqui
          </Typography>
        </CardContent>

        <CardActions sx={homeStyles.cardActions}>
          {match.status === 'Finalizada' ? (
            <Button
              size="small"
              sx={homeStyles.recapButton}
              onClick={() => onOpenRecapModal(match.name)}
              startIcon={<EmojiEventsIcon />}
            >
              Gerar Resumo ✨
            </Button>
          ) : (
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
                onClick={() => onMatchDetailsClick(match.id)}
              >
                Ver Detalhes
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
