import { Grid } from '@mui/material';
import React, { memo } from 'react';
import type { Sala } from '../../../../domain/entities/Sala';
import { TEXTO_VAZIO, TITULOS } from '../constants';
import { ListaVazia } from './ListaVazia';
import { SalaCard } from './SalaCard';
import { SecaoBase } from './SecaoBase';

interface SecaoSalasProps {
  salas: Sala[];
  onRoomDetailsClick: (roomId: string) => void;
}

export const SecaoSalas: React.FC<SecaoSalasProps> = memo(({ salas, onRoomDetailsClick }) => (
  <SecaoBase titulo={TITULOS.MINHAS_SALAS}>
    {salas.length > 0 ? (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {salas.map(sala => (
          <SalaCard key={sala.id} room={sala} onRoomDetailsClick={onRoomDetailsClick} />
        ))}
      </Grid>
    ) : (
      <ListaVazia mensagem={TEXTO_VAZIO.SALAS} />
    )}
  </SecaoBase>
));

SecaoSalas.displayName = 'SecaoSalas';
