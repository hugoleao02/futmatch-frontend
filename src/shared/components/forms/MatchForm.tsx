import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface MatchFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isSubmitting?: boolean;
}

export function MatchForm({ onSubmit, initialData, isSubmitting = false }: MatchFormProps) {
  const [formData, setFormData] = useState(initialData || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Título"
        value={formData.title || ''}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        margin="normal"
        disabled={isSubmitting}
      />
      <TextField
        fullWidth
        label="Local"
        value={formData.location || ''}
        onChange={e => setFormData({ ...formData, location: e.target.value })}
        margin="normal"
        disabled={isSubmitting}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </Box>
  );
}
