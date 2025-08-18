import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner = ({
  message = 'Carregando...',
  fullHeight = false,
}: LoadingSpinnerProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: fullHeight ? '100vh' : 'auto',
      gap: 2,
    }}
  >
    <CircularProgress size={40} />
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </Box>
);
