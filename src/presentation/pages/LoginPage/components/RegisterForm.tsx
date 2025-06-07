import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Link as MuiLink, Stack, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../infra/di/AuthProvider";
import { toast } from 'react-toastify';
import React, { useState } from 'react';

interface RegisterFormInputs {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

interface RegisterFormProps {
  setActiveTab: (tab: number) => void;
}

export function RegisterForm({ setActiveTab }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  const { useCases: { registerUseCase } } = useAuth();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setLoading(true);
      if (data.senha !== data.confirmarSenha) {
        toast.error('As senhas não coincidem!');
        return;
      }
      const response = await registerUseCase.execute(data.nome, data.email, data.senha);
      toast.success(`Bem-vindo(a), ${response.user.nome}!`);
      setActiveTab(0);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao realizar cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'center', mb: 2 }}>
        Crie sua conta
      </Typography>

      <TextField
        label="Seu nome ou apelido"
        variant="outlined"
        fullWidth
        required
        error={!!errors.nome}
        helperText={errors.nome?.message}
        {...register('nome', { required: 'Nome é obrigatório' })}
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
        label="Seu melhor e-mail"
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
        label="Crie uma senha"
        variant="outlined"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        required
        error={!!errors.senha}
        helperText={errors.senha?.message}
        {...register('senha', { 
          required: 'Senha é obrigatória',
          minLength: { value: 6, message: 'Mínimo de 6 caracteres' }
        })}
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

      <TextField
        label="Confirme sua senha"
        variant="outlined"
        fullWidth
        type="password"
        required
        error={!!errors.confirmarSenha || (watch('senha') !== watch('confirmarSenha') && watch('confirmarSenha').length > 0)}
        helperText={
          errors.confirmarSenha?.message ||
          (watch('senha') !== watch('confirmarSenha') && watch('confirmarSenha').length > 0)
            ? 'As senhas não coincidem'
            : ''
        }
        {...register('confirmarSenha', {
          required: 'Confirmação de senha é obrigatória',
          validate: (value) => value === watch('senha') || 'As senhas não coincidem',
        })}
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

      <FormControlLabel
        control={<Checkbox required sx={{ color: '#1B5E20', '&.Mui-checked': { color: '#1B5E20' }, transform: 'scale(1.2)' }} />}
        label={
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Li e aceito os{' '}
            <MuiLink href="#" sx={{ color: '#1B5E20', textDecoration: 'none', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
              Termos de Serviço
            </MuiLink>{' '}
            e a{' '}
            <MuiLink href="#" sx={{ color: '#1B5E20', textDecoration: 'none', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
              Política de Privacidade
            </MuiLink>
            .
          </Typography>
        }
      />

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
        {loading ? <CircularProgress size={28} color="inherit" /> : 'Cadastrar'}
      </Button>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 3 }}>
        <Box sx={{ flexGrow: 1, borderBottom: '1px solid #E0E0E0' }} />
        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
          Ou cadastre-se com
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
        Já tem uma conta?{' '}
        <MuiLink
          component="button"
          onClick={() => setActiveTab(0)}
          sx={{ color: '#1B5E20', textDecoration: 'none', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}
        >
          Faça Login
        </MuiLink>
      </Typography>
    </Box>
  );
} 