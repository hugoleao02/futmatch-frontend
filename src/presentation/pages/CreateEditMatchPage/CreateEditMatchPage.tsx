import { AppBar, Box, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { MatchForm } from './components/MatchForm';
import { useCreateEditMatch } from './hooks/useCreateEditMatch';
import { styles } from './styles';

const CreateEditMatchPage: React.FC = () => {
  const {
    nome,
    esporte,
    latitude,
    longitude,
    data,
    hora,
    totalJogadores,
    tipoPartida,
    loading,
    isEdit,
    error,
    handleNomeChange,
    handleEsporteChange,
    handleLatitudeChange,
    handleLongitudeChange,
    handleDataChange,
    handleHoraChange,
    handleTotalJogadoresChange,
    handleTipoPartidaChange,
    handleSubmit,
    handleBack,
  } = useCreateEditMatch();

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

        <MatchForm
          nome={nome}
          esporte={esporte}
          latitude={latitude}
          longitude={longitude}
          data={data}
          hora={hora}
          totalJogadores={totalJogadores}
          tipoPartida={tipoPartida}
          loading={loading}
          isEdit={isEdit}
          onNomeChange={handleNomeChange}
          onEsporteChange={handleEsporteChange}
          onLatitudeChange={handleLatitudeChange}
          onLongitudeChange={handleLongitudeChange}
          onDataChange={handleDataChange}
          onHoraChange={handleHoraChange}
          onTotalJogadoresChange={handleTotalJogadoresChange}
          onTipoPartidaChange={handleTipoPartidaChange}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </Paper>
    </Box>
  );
};

export default CreateEditMatchPage;
