import { Box, Button, Typography, Paper } from "@mui/material";
import { Input } from "../../../components/Input/Input";
import { Logo } from "./components/Logo";
import { styles } from "./styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../infra/di/AuthProvider";
import { toast } from 'react-toastify';

interface LoginFormInputs {
  email: string;
  senha: string;
}

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const { useCases: { loginUseCase } } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUseCase.execute(data.email, data.senha);
      localStorage.setItem('token', result.token);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Erro ao fazer login');
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Paper elevation={0} sx={styles.paper}>
        <Box mb={2}>
          <Logo size="large" />
        </Box>

        <Typography sx={styles.title} component="h1">
          FutMatch
        </Typography>

        <Typography variant="body1" sx={styles.subtitle}>
          Login ou cadastre-se para encontrar<br />partidas de futebol pelada
        </Typography>

        <Box 
          component="form" 
          sx={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="E-mail"
            type="email"
            autoComplete="email"
            required
            fullWidth
            placeholder="Digite seu e-mail"
            error={!!errors.email}
            helperText={errors.email ? 'E-mail é obrigatório' : ''}
            {...register('email', { required: true })}
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
            placeholder="Digite sua senha"
            error={!!errors.senha}
            helperText={errors.senha ? 'Senha é obrigatória' : ''}
            {...register('senha', { required: true })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.submitButton}
          >
            Entrar
          </Button>
        </Box>

        <Typography variant="body2" sx={styles.footerText}>
          Não tem uma conta?{' '}
          <Box
            component="span"
            sx={styles.footerLink}
            onClick={() => navigate('/register')}
          >
            Cadastre-se
          </Box>
        </Typography>

        <Logo size="small" />
      </Paper>
    </Box>
  );
} 