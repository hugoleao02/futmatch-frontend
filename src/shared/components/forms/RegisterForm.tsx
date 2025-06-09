import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  onToggleMode: () => void;
  isSubmitting?: boolean;
}

export function RegisterForm({ onSubmit, onToggleMode, isSubmitting = false }: RegisterFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Nome"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
        disabled={isSubmitting}
      />
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
        {isSubmitting ? 'Criando conta...' : 'Criar conta'}
      </Button>
      <Button onClick={onToggleMode} fullWidth sx={{ mt: 1 }} disabled={isSubmitting}>
        Já tenho uma conta
      </Button>
    </Box>
  );
}
