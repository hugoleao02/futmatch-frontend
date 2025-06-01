import { Box, Button, Typography, Paper } from "@mui/material";
import { Input } from "../../../components/Input/Input";
import { Logo } from "./components/Logo";
import { styles } from "./styles";
import { useState } from "react";

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implementar lógica de login
    console.log({ email, password });
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
          onSubmit={handleSubmit}
        >
          <Input
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
            required
            fullWidth
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            fullWidth
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          >
            Cadastre-se
          </Box>
        </Typography>

        <Logo size="small" />
      </Paper>
    </Box>
  );
} 