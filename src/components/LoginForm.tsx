import { Box, Button, CircularProgress, Link, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    onSubmit,
  } = useLoginForm();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('senha', {
              required: 'Senha é obrigatória',
              minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' },
            })}
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.senha}
            helperText={errors.senha?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Entrar'}
          </Button>
        </form>
        <Box textAlign="center">
          <Link component="button" variant="body2" onClick={() => navigate(ROUTES.REGISTER)}>
            Não tem uma conta? Cadastre-se
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};
