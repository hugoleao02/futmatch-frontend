import { Group as GroupIcon, Groups as GroupsIcon } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import type { Room } from '../../../../core/usecases/interfaces/IHomeUseCase';
import { homeStyles } from '../styles/homeStyles';

interface RoomCardProps {
  room: Room;
  onRoomDetailsClick: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onRoomDetailsClick }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card elevation={2} sx={homeStyles.roomCard}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            <GroupsIcon sx={{ mr: 1, color: '#0D47A1' }} />
            <Typography variant="h6" component="div" sx={homeStyles.cardTitle}>
              {room.name}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {room.description}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <GroupIcon sx={homeStyles.icon} />
            Membros: {room.membersCount}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
            Última atividade: {room.recentMatch}
          </Typography>
        </CardContent>

        <CardActions sx={homeStyles.cardActions}>
          <Button
            size="small"
            sx={homeStyles.detailsButton}
            onClick={() => onRoomDetailsClick(room.id)}
          >
            Ver Sala
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
