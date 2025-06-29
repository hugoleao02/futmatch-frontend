import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRegisterForm } from '../hooks/useRegisterForm';

interface RegisterFormProps {
  setActiveTab: () => void;
}

export const RegisterForm = ({ setActiveTab }: RegisterFormProps) => {
  const { formik } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
      }}
    >
      <Typography variant="h4" fontWeight={700} color="#222" align="center" mb={1}>
        Crie sua conta
      </Typography>
      <TextField
        id="register-nome"
        name="nome"
        label="Seu nome ou apelido (visível para outros)"
        value={formik.values.nome}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.nome && Boolean(formik.errors.nome)}
        helperText={formik.touched.nome && formik.errors.nome}
        fullWidth
        required
        variant="outlined"
        autoComplete="name"
      />
      <TextField
        id="register-email"
        name="email"
        label="Seu melhor e-mail"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        required
        variant="outlined"
        autoComplete="email"
      />
      <TextField
        id="register-password"
        name="senha"
        label="Crie uma senha"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.senha}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.senha && Boolean(formik.errors.senha)}
        helperText={formik.touched.senha && formik.errors.senha}
        fullWidth
        required
        variant="outlined"
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <Button
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              sx={{ minWidth: 0, p: 0.5 }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </Button>
          ),
        }}
      />
      <TextField
        id="register-confirm-password"
        name="confirmarSenha"
        label="Confirme sua senha"
        type="password"
        value={formik.values.confirmarSenha}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
        helperText={formik.touched.confirmarSenha && formik.errors.confirmarSenha}
        fullWidth
        required
        variant="outlined"
        autoComplete="new-password"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="aceitarTermos"
            color="success"
            checked={formik.values.aceitarTermos}
            onChange={formik.handleChange}
            required
          />
        }
        label={
          <span>
            Li e aceito os{' '}
            <a href="#" style={{ color: '#16a34a', textDecoration: 'underline' }}>
              Termos de Serviço
            </a>{' '}
            e a{' '}
            <a href="#" style={{ color: '#16a34a', textDecoration: 'underline' }}>
              Política de Privacidade
            </a>
            .
          </span>
        }
        sx={{ alignItems: 'flex-start', mt: -1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="large"
        sx={{
          borderRadius: 2,
          fontWeight: 700,
          fontSize: 18,
          boxShadow: 3,
          py: 1.5,
          mt: 1,
          mb: 1,
          textTransform: 'none',
        }}
        disabled={formik.isSubmitting}
        startIcon={
          formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : <CheckCircleIcon />
        }
      >
        {formik.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
      <Typography align="center" variant="body2" color="text.secondary" mt={2}>
        Já tem uma conta?{' '}
        <Button
          onClick={setActiveTab}
          sx={{ color: '#16a34a', fontWeight: 600, textTransform: 'none', p: 0, minWidth: 0 }}
        >
          Faça Login
        </Button>
      </Typography>
    </Box>
  );
};
