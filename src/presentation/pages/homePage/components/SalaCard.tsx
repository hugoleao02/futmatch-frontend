import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Sala } from '../../../../domain/entities/Sala';
import { homeStyles } from '../styles/homeStyles';

interface SalaCardProps {
  room: Sala;
  onRoomDetailsClick: (roomId: string) => void;
}

export const SalaCard: React.FC<SalaCardProps> = ({ room, onRoomDetailsClick }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/room/edit?id=${room.id}`);
  };

  return (
    <Card elevation={3} sx={homeStyles.roomCard}>
      <CardContent>
        <Typography variant="h6" component="div" sx={homeStyles.cardTitle}>
          {room.nome}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Total de Participantes: {room.totalParticipantes}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {room.descricao}
        </Typography>
      </CardContent>

      <CardActions sx={homeStyles.cardActions}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" sx={homeStyles.editButton} onClick={handleEditClick}>
            Editar
          </Button>
          <Button
            size="small"
            sx={homeStyles.detailsButton}
            onClick={() => onRoomDetailsClick(room.id)}
          >
            Ver Detalhes
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
