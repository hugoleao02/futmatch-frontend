import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import type { FormikProps } from 'formik';
import { useState } from 'react';
import {
  formStyles,
  linkStyles,
  loginLinkStyles,
  submitButtonStyles,
  textFieldStyles,
  titleStyles,
} from './styles/FormularioRegistro.styles';

type CadastroValues = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  aceitarTermos: boolean;
};

interface FormularioRegistroProps {
  formik: FormikProps<CadastroValues>;
  estaEnviando: boolean;
}

export const FormularioRegistro = ({ formik, estaEnviando }: FormularioRegistroProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      <Typography variant="h4" component="h2" sx={titleStyles}>
        Crie sua conta
      </Typography>

      <TextField
        label="Seu nome ou apelido (visível para outros)"
        variant="outlined"
        fullWidth
        name="nome"
        value={formik.values.nome}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.nome && Boolean(formik.errors.nome)}
        helperText={formik.touched.nome && formik.errors.nome}
        required
        sx={textFieldStyles}
      />

      <TextField
        label="Seu melhor e-mail"
        variant="outlined"
        fullWidth
        type="email"
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
        label="Crie uma senha"
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

      <TextField
        label="Confirme sua senha"
        variant="outlined"
        fullWidth
        type="password"
        name="confirmarSenha"
        value={formik.values.confirmarSenha}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
        helperText={formik.touched.confirmarSenha && formik.errors.confirmarSenha}
        required
        sx={textFieldStyles}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="aceitarTermos"
            checked={formik.values.aceitarTermos}
            onChange={formik.handleChange}
            color="primary"
          />
        }
        label="Aceito os termos e condições"
        sx={{
          color:
            formik.touched.aceitarTermos && formik.errors.aceitarTermos
              ? 'error.main'
              : 'text.primary',
        }}
      />
      {formik.touched.aceitarTermos && formik.errors.aceitarTermos && (
        <Typography variant="caption" color="error" sx={{ mt: -2, ml: 2 }}>
          {formik.errors.aceitarTermos}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={estaEnviando}
        sx={submitButtonStyles}
      >
        {estaEnviando ? <CircularProgress size={28} color="inherit" /> : 'Cadastrar'}
      </Button>

      <Typography variant="body1" sx={loginLinkStyles}>
        Já tem uma conta?{' '}
        <Link component="button" sx={linkStyles}>
          Faça Login
        </Link>
      </Typography>
    </Box>
  );
};
