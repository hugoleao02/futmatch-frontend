import { Box, Button, Typography } from '@mui/material';
import { useNavegacao } from '../../hooks/useNavegacao';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const { navegarParaHome } = useNavegacao();

  return (
    <Box
      role="alert"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        Algo deu errado!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {error.message}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={resetErrorBoundary}>
          Tentar novamente
        </Button>
        <Button variant="outlined" onClick={navegarParaHome}>
          Voltar ao início
        </Button>
      </Box>
    </Box>
  );
};
