import { Typography } from '@mui/material';
import React from 'react';

interface ListaVaziaProps {
  mensagem: string;
  variant?: 'body1' | 'h6';
}

export const ListaVazia: React.FC<ListaVaziaProps> = ({ mensagem, variant = 'body1' }) => (
  <Typography
    variant={variant}
    color="text.secondary"
    textAlign="center"
    mt={variant === 'h6' ? 4 : 0}
  >
    {mensagem}
  </Typography>
);
