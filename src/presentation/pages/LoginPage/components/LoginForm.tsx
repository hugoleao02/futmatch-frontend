import { Box, Typography, TextField, Button, Link as MuiLink, Stack, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../infra/di/AuthProvider";
import { toast } from 'react-toastify';
import React, { useState } from 'react';

interface LoginFormInputs {
  email: string;
  senha: string;
}

interface LoginFormProps {
  setActiveTab: (tab: number) => void;
}

export function LoginForm({ setActiveTab }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const { useCases: { loginUseCase } } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const result = await loginUseCase.execute(data.email, data.senha);
      localStorage.setItem('token', result.token);
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Erro ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'center', mb: 2 }}>
        Bem-vindo de volta!
      </Typography>

      <TextField
        label="Seu e-mail"
        variant="outlined"
        fullWidth
        type="email"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', { required: 'E-mail é obrigatório' })}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: '1.1rem',
            '&.Mui-focused fieldset': {
              borderColor: '#1B5E20',
              borderWidth: '3px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.1rem',
            '&.Mui-focused': {
              color: '#1B5E20',
            },
          },
        }}
      />

      <TextField
        label="Sua senha"
        variant="outlined"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        required
        error={!!errors.senha}
        helperText={errors.senha?.message}
        {...register('senha', { required: 'Senha é obrigatória' })}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: '1.1rem',
            '&.Mui-focused fieldset': {
              borderColor: '#1B5E20',
              borderWidth: '3px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.1rem',
            '&.Mui-focused': {
              color: '#1B5E20',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: 'text.secondary' }}
              >
                {showPassword ? <VisibilityOff sx={{ fontSize: '1.5rem' }} /> : <Visibility sx={{ fontSize: '1.5rem' }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <MuiLink
        href="#"
        variant="body1"
        sx={{
          color: '#1B5E20',
          textDecoration: 'none',
          alignSelf: 'flex-end',
          fontWeight: 'medium',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        Esqueci minha senha
      </MuiLink>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        sx={{
          mt: 3,
          py: 1.8,
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: 'linear-gradient(45deg, #2E7D32 30%, #66BB6A 90%)',
            transform: 'scale(1.03)',
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.4)',
          },
          '&:active': {
            transform: 'scale(0.97)',
          },
        }}
      >
        {loading ? <CircularProgress size={28} color="inherit" /> : 'Entrar'}
      </Button>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 3 }}>
        <Box sx={{ flexGrow: 1, borderBottom: '1px solid #E0E0E0' }} />
        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
          Ou continue com
        </Typography>
        <Box sx={{ flexGrow: 1, borderBottom: '1px solid #E0E0E0' }} />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<Box component="img" src="https://img.icons8.com/color/32/000000/google-logo.png" alt="Google" sx={{ width: 32, height: 32 }} />}
          sx={{
            py: 1.5,
            borderRadius: '12px',
            borderColor: '#E0E0E0',
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              borderColor: '#BDBDBD',
              backgroundColor: '#FAFAFA',
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Continuar com Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<Box component="img" src="https://img.icons8.com/color/32/000000/facebook-new.png" alt="Facebook" sx={{ width: 32, height: 32 }} />}
          sx={{
            py: 1.5,
            borderRadius: '12px',
            borderColor: '#E0E0E0',
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              borderColor: '#BDBDBD',
              backgroundColor: '#FAFAFA',
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Continuar com Facebook
        </Button>
      </Stack>

      <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mt: 3 }}>
        Não tem uma conta?{' '}
        <MuiLink
          component="button"
          onClick={() => setActiveTab(1)}
          sx={{ color: '#1B5E20', textDecoration: 'none', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}
        >
          Cadastre-se
        </MuiLink>
      </Typography>
    </Box>
  );
} 