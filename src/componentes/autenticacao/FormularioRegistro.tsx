import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { CampoSenha } from '../../shared/components';
import type { FormularioCadastroProps } from '../../shared/types';
import {
  formStyles,
  linkStyles,
  loginLinkStyles,
  submitButtonStyles,
  textFieldStyles,
  titleStyles,
} from './styles/FormularioRegistro.styles';

export const FormularioRegistro = ({ formik, estaEnviando }: FormularioCadastroProps) => {
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

      <CampoSenha
        name="senha"
        label="Crie uma senha"
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
