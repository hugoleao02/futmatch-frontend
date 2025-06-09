import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  onToggleMode: () => void;
  isSubmitting?: boolean;
}

export function LoginForm({ onSubmit, onToggleMode, isSubmitting = false }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        margin="normal"
        disabled={isSubmitting}
      />
      <TextField
        fullWidth
        label="Senha"
        type="password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        margin="normal"
        disabled={isSubmitting}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
      <Button onClick={onToggleMode} fullWidth sx={{ mt: 1 }} disabled={isSubmitting}>
        Criar conta
      </Button>
    </Box>
  );
}
