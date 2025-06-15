import { Grid, Paper } from '@mui/material';
import React, { memo } from 'react';
import type { Partida } from '../../../../domain/entities/Partida';
import { TEXTO_VAZIO, TITULOS } from '../constants';
import { homeStyles } from '../styles/homeStyles';
import { ListaVazia } from './ListaVazia';
import { PartidaCard } from './PartidaCard';
import { SecaoBase } from './SecaoBase';

interface SecaoPartidasProps {
  partidas: Partida[];
  mostrarMapa: boolean;
  onMatchDetailsClick: (matchId: string) => void;
  onOpenRecapModal: (matchName: string) => void;
}

export const SecaoPartidas: React.FC<SecaoPartidasProps> = memo(
  ({ partidas, mostrarMapa, onMatchDetailsClick, onOpenRecapModal }) => (
    <SecaoBase titulo={TITULOS.PARTIDAS_PROXIMAS}>
      {mostrarMapa ? (
        <Paper elevation={3} sx={homeStyles.mapPlaceholder}>
          <ListaVazia mensagem={TEXTO_VAZIO.MAPA_PLACEHOLDER} variant="h6" />
        </Paper>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {partidas.map(partida => (
            <PartidaCard
              key={partida.id}
              partida={partida}
              onMatchDetailsClick={onMatchDetailsClick}
              onOpenRecapModal={onOpenRecapModal}
            />
          ))}
          {partidas.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <ListaVazia mensagem={TEXTO_VAZIO.PARTIDAS} variant="h6" />
            </Grid>
          )}
        </Grid>
      )}
    </SecaoBase>
  ),
);

SecaoPartidas.displayName = 'SecaoPartidas';
