import { Box, Button, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { CampoSenha } from '../../shared/components';
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
        sx={textFieldStyles}
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
