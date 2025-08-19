import { Box, Typography } from '../../shared/components';
import { brandColumnStyles } from './styles/TelaAutenticacao.styles';

export const MarcaSection = () => (
  <Box sx={brandColumnStyles}>
    <Typography
      variant="h3"
      weight="bold"
      color="primary"
      align="center"
      sx={{
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
      weight="normal"
      color="text"
      align="center"
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
