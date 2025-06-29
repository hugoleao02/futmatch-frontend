import { AppBar, Box, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { PartidaForm } from './components/PartidaForm';
import { useCriarPartida } from './hooks/useCriarPartida';
import { styles } from './styles';

const CriarPartidaPage: React.FC = () => {
  const { isEdit, error } = useCriarPartida();

  return (
    <Box sx={styles.container}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h6" sx={styles.title}>
            {isEdit ? 'Editar Partida' : 'Nova Partida'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper sx={styles.paper}>
        <Typography variant="h5" sx={styles.formTitle}>
          {isEdit ? 'Editar Partida' : 'Criar Nova Partida'}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <PartidaForm />
      </Paper>
    </Box>
  );
};

export default CriarPartidaPage;
