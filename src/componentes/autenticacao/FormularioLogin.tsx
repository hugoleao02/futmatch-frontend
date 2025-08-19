import { Box, CircularProgress, Link } from '@mui/material';
import { Button, CampoSenha, TextField, Typography } from '../../shared/components';
import type { FormularioLoginProps } from '../../shared/types';
import {
  forgotPasswordStyles,
  formStyles,
  submitButtonStyles,
  textFieldStyles,
  titleStyles,
} from './styles/FormularioLogin.styles';

export const FormularioLogin = ({ formik, estaEnviando }: FormularioLoginProps) => {
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      <Typography variant="h4" weight="semibold" color="primary" align="center" sx={titleStyles}>
        Bem-vindo de volta!
      </Typography>

      <TextField
        label="Seu e-mail ou nome de usuário"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={
          formik.touched.email && formik.errors.email ? String(formik.errors.email) : undefined
        }
        required
        autoComplete="username"
        sx={textFieldStyles}
      />

      <CampoSenha
        name="senha"
        label="Sua senha"
        value={formik.values.senha}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.senha && formik.errors.senha)}
        helperText={
          formik.touched.senha && formik.errors.senha ? String(formik.errors.senha) : undefined
        }
        required
        autoComplete="current-password"
        sx={textFieldStyles}
      />

      <Link href="#" variant="body1" sx={forgotPasswordStyles}>
        Esqueci minha senha
      </Link>

      <Button
        type="submit"
        variant="primary"
        size="large"
        loading={estaEnviando}
        fullWidth
        sx={submitButtonStyles}
      >
        {estaEnviando ? <CircularProgress size={28} color="inherit" /> : 'Entrar'}
      </Button>
    </Box>
  );
};
