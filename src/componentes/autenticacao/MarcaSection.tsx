import { Box, Typography } from '@mui/material';
import { brandColumnStyles } from './styles/TelaAutenticacao.styles';

export const MarcaSection = () => (
  <Box sx={brandColumnStyles}>
    <Typography
      variant="h3"
      component="h1"
      sx={{
        fontWeight: 'bold',
        mb: 2,
        lineHeight: 1.2,
        textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
      }}
    >
      Sua pelada nunca mais será a mesma.
    </Typography>
    <Typography
      variant="h6"
      sx={{
        opacity: 0.95,
        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
      }}
    >
      Conecte-se. Jogue. Divirta-se. Encontre sua partida perfeita.
    </Typography>
  </Box>
);
