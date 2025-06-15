import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { useRegisterForm } from '../hooks/useRegisterForm.ts';
import {
  formStyles,
  linkStyles,
  loginLinkStyles,
  submitButtonStyles,
  textFieldStyles,
  titleStyles,
} from '../styles/RegisterForm.styles.ts';

interface RegisterFormProps {
  setActiveTab: (tab: number) => void;
}

const RegisterForm = ({ setActiveTab }: RegisterFormProps) => {
  const {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    showPassword,
    loading,
    handleSubmit,
    togglePasswordVisibility,
    handleLoginClick,
  } = useRegisterForm({ setActiveTab });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
      <Typography variant="h4" component="h2" sx={titleStyles}>
        Crie sua conta
      </Typography>

      <TextField
        label="Seu nome ou apelido (visível para outros)"
        variant="outlined"
        fullWidth
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        sx={textFieldStyles}
      />

      <TextField
        label="Seu melhor e-mail"
        variant="outlined"
        fullWidth
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        sx={textFieldStyles}
      />

      <TextField
        label="Crie uma senha"
        variant="outlined"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        value={senha}
        onChange={e => setSenha(e.target.value)}
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
        value={confirmarSenha}
        onChange={e => setConfirmarSenha(e.target.value)}
        required
        sx={textFieldStyles}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        sx={submitButtonStyles}
      >
        {loading ? <CircularProgress size={28} color="inherit" /> : 'Cadastrar'}
      </Button>

      <Typography variant="body1" sx={loginLinkStyles}>
        Já tem uma conta?{' '}
        <MuiLink component="button" onClick={handleLoginClick} sx={linkStyles}>
          Faça Login
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
