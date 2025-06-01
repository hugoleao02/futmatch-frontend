import { Box, Typography, Paper } from "@mui/material";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../LoginPage/components/Logo";
import { useAuth } from "../../../infra/di/AuthProvider";
import { toast } from 'react-toastify';

interface RegisterFormInputs {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const { useCases: { registerUseCase } } = useAuth();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerUseCase.execute(data.nome, data.email, data.senha);
      toast.success(`Bem-vindo(a), ${response.user.nome}!`);
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao realizar cadastro');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#15543A',
        px: { xs: 2, sm: 0 },
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: { xs: '100%', sm: 400, md: 440 },
          width: { xs: '100%', sm: 400, md: 440 },
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(21,84,58,0.97)',
          mx: { xs: 1, sm: 0 },
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <Box mb={2}>
          <Logo size="large" />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '2.2rem', sm: '2.7rem' },
            fontWeight: 700,
            color: '#D6B36A',
            fontFamily: 'Pacifico, cursive',
            mb: 1,
            textShadow: '0 2px 8px rgba(0,0,0,0.18)',
            textAlign: 'center',
          }}
          component="h1"
        >
          FutMatch
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#D6B36A',
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            fontWeight: 400,
            textAlign: 'center',
            mb: { xs: 2, sm: 3 },
            textShadow: '0 1px 4px rgba(0,0,0,0.10)'
          }}
        >
          Crie uma conta para começar a<br />encontrar partidas de futebol pelda
        </Typography>
        <Box
          component="form"
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Nome"
            type="text"
            required
            fullWidth
            placeholder="Nome"
            error={!!errors.nome}
            helperText={errors.nome ? 'Nome é obrigatório' : ''}
            {...register('nome', { required: true })}
          />
          <Input
            label="E-mail"
            type="email"
            required
            fullWidth
            placeholder="E-mail"
            error={!!errors.email}
            helperText={errors.email ? 'E-mail é obrigatório' : ''}
            {...register('email', { required: true })}
          />
          <Input
            label="Senha"
            type="password"
            required
            fullWidth
            placeholder="Senha"
            error={!!errors.senha}
            helperText={errors.senha ? 'Senha é obrigatória' : ''}
            {...register('senha', { required: true })}
          />
          <Input
            label="Confirmar senha"
            type="password"
            required
            fullWidth
            placeholder="Confirmar senha"
            error={!!errors.confirmarSenha || (watch('senha') !== watch('confirmarSenha'))}
            helperText={
              errors.confirmarSenha
                ? 'Confirmação obrigatória'
                : watch('senha') !== watch('confirmarSenha')
                  ? 'As senhas não coincidem'
                  : ''
            }
            {...register('confirmarSenha', { required: true })}
          />
          <Button
            type="submit"
            sx={{
              mt: { xs: 0.5, sm: 1 },
              bgcolor: '#D6B36A',
              color: '#15543A',
              fontWeight: 700,
              fontSize: { xs: '1.15rem', sm: '1.25rem' },
              borderRadius: 22,
              py: 1.3,
              '&:hover': { bgcolor: '#B89B4A', color: '#15543A' },
              boxShadow: 3,
              border: '2px solid #D6B36A',
              transition: '0.2s',
            }}
            fullWidth
          >
            Cadastrar
          </Button>
        </Box>
        <Box mt={3} display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="body2"
            sx={{ color: '#D6B36A', fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 400 }}
          >
            Já tem uma conta?{' '}
            <Link to="/login" style={{ color: '#D6B36A', textDecoration: 'underline', fontWeight: 700, marginRight: 10 }}>
              Faça login
            </Link>
          </Typography>
          <Logo size="small" />
        </Box>
      </Paper>
    </Box>
  );
} 