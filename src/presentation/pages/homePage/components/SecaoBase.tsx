import { Paper, Typography } from '@mui/material';
import React from 'react';
import { homeStyles } from '../styles/homeStyles';

interface SecaoBaseProps {
  titulo: string;
  children: React.ReactNode;
}

export const SecaoBase: React.FC<SecaoBaseProps> = ({ titulo, children }) => (
  <Paper elevation={3} sx={homeStyles.section}>
    <Typography variant="h5" component="h2" sx={homeStyles.sectionTitle}>
      {titulo}
    </Typography>
    {children}
  </Paper>
);
