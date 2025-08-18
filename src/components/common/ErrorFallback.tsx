import { Home as HomeIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useNavigation } from '../../hooks/useNavigation';
import type { ErrorType } from '../../stores/errorStore';

interface ErrorFallbackProps {
  error: Error;
  errorType?: ErrorType;
  resetErrorBoundary?: () => void;
  showRetry?: boolean;
  showHome?: boolean;
}

export const ErrorFallback = ({
  error,
  errorType = 'UNKNOWN',
  resetErrorBoundary,
  showRetry = true,
  showHome = true,
}: ErrorFallbackProps) => {
  const { navigateToHome } = useNavigation();

  const getErrorIcon = () => {
    switch (errorType) {
      case 'AUTH':
        return '🔐';
      case 'NETWORK':
        return '🌐';
      case 'VALIDATION':
        return '⚠️';
      case 'SERVER':
        return '🖥️';
      case 'UNKNOWN':
      default:
        return '❌';
    }
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case 'AUTH':
        return 'Erro de autenticação';
      case 'NETWORK':
        return 'Erro de conexão';
      case 'VALIDATION':
        return 'Dados inválidos';
      case 'SERVER':
        return 'Erro do servidor';
      case 'UNKNOWN':
      default:
        return 'Erro inesperado';
    }
  };

  const getErrorDescription = () => {
    switch (errorType) {
      case 'AUTH':
        return 'Sua sessão pode ter expirado. Tente fazer login novamente.';
      case 'NETWORK':
        return 'Verifique sua conexão com a internet e tente novamente.';
      case 'VALIDATION':
        return 'Os dados fornecidos não são válidos. Verifique e tente novamente.';
      case 'SERVER':
        return 'O servidor está enfrentando problemas. Tente novamente em alguns minutos.';
      case 'UNKNOWN':
      default:
        return 'Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
        {getErrorIcon()}
      </Typography>

      <Typography variant="h4" component="h1" gutterBottom>
        {getErrorMessage()}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
        {getErrorDescription()}
      </Typography>

      {process.env.NODE_ENV === 'development' && (
        <Alert severity="info" sx={{ mb: 3, maxWidth: 500, textAlign: 'left' }}>
          <Typography variant="body2" component="div">
            <strong>Detalhes técnicos:</strong>
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem', mt: 1 }}>
            {error.message}
          </Typography>
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {showRetry && resetErrorBoundary && (
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={resetErrorBoundary}>
            Tentar Novamente
          </Button>
        )}

        {showHome && (
          <Button variant="outlined" startIcon={<HomeIcon />} onClick={navigateToHome}>
            Voltar ao Início
          </Button>
        )}
      </Box>
    </Box>
  );
};
