import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useLoginForm } from '../hooks/useLoginForm';

interface LoginFormProps {
  setActiveTab: () => void;
}

export const LoginForm = ({ setActiveTab }: LoginFormProps) => {
  const { formik } = useLoginForm();

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
        Bem-vindo de volta!
      </Typography>
      <TextField
        id="login-email"
        name="email"
        label="Seu e-mail"
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
        id="login-password"
        name="senha"
        label="Sua senha"
        type="password"
        value={formik.values.senha}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.senha && Boolean(formik.errors.senha)}
        helperText={formik.touched.senha && formik.errors.senha}
        fullWidth
        required
        variant="outlined"
        autoComplete="current-password"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          href="#"
          size="small"
          sx={{ color: '#16a34a', fontWeight: 500, textTransform: 'none' }}
        >
          Esqueci minha senha
        </Button>
      </Box>
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
        startIcon={formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : null}
      >
        {formik.isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
      <Typography align="center" variant="body2" color="text.secondary" mt={2}>
        Não tem uma conta?{' '}
        <Button
          onClick={setActiveTab}
          sx={{ color: '#16a34a', fontWeight: 600, textTransform: 'none', p: 0, minWidth: 0 }}
        >
          Cadastre-se
        </Button>
      </Typography>
    </Box>
  );
};
