import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import type { FormikProps } from 'formik';
import { useState } from 'react';
import {
  forgotPasswordStyles,
  formStyles,
  submitButtonStyles,
  textFieldStyles,
  titleStyles,
} from './styles/FormularioLogin.styles';

type LoginValues = { email: string; senha: string };

interface FormularioLoginProps {
  formik: FormikProps<LoginValues>;
  estaEnviando: boolean;
}

export const FormularioLogin = ({ formik, estaEnviando }: FormularioLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      <Typography variant="h4" component="h2" sx={titleStyles}>
        Bem-vindo de volta!
      </Typography>

      <TextField
        label="Seu e-mail ou nome de usuário"
        variant="outlined"
        fullWidth
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        required
        sx={textFieldStyles}
      />

      <TextField
        label="Sua senha"
        variant="outlined"
        fullWidth
        name="senha"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.senha}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.senha && Boolean(formik.errors.senha)}
        helperText={formik.touched.senha && formik.errors.senha}
        required
        sx={textFieldStyles}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
                sx={{ color: 'text.secondary' }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: '1.5rem' }} />
                ) : (
                  <Visibility sx={{ fontSize: '1.5rem' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link href="#" variant="body1" sx={forgotPasswordStyles}>
        Esqueci minha senha
      </Link>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={estaEnviando}
        sx={submitButtonStyles}
      >
        {estaEnviando ? <CircularProgress size={28} color="inherit" /> : 'Entrar'}
      </Button>
    </Box>
  );
};
