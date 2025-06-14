import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  textFieldStyles,
  formStyles,
  titleStyles,
  forgotPasswordStyles,
  submitButtonStyles,
} from '../styles/LoginForm.styles.ts';
import { useLoginForm } from '../hooks/useLoginForm.ts';

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    loading,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
      <Typography variant="h4" component="h2" sx={titleStyles}>
        Bem-vindo de volta!
      </Typography>

      <TextField
        label="Seu e-mail ou nome de usuário"
        variant="outlined"
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        sx={textFieldStyles}
      />

      <TextField
        label="Sua senha"
        variant="outlined"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
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

      <MuiLink href="#" variant="body1" sx={forgotPasswordStyles}>
        Esqueci minha senha
      </MuiLink>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        sx={submitButtonStyles}
      >
        {loading ? <CircularProgress size={28} color="inherit" /> : 'Entrar'}
      </Button>
    </Box>
  );
};

export default LoginForm;
