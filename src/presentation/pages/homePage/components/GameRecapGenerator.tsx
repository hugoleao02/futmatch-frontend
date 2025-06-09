import { Close as CloseIcon } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface GameRecapGeneratorProps {
  open: boolean;
  onClose: () => void;
  matchName: string;
  onGenerateRecap: (matchName: string, details: string) => Promise<string>;
}

export const GameRecapGenerator: React.FC<GameRecapGeneratorProps> = ({
  open,
  onClose,
  matchName,
  onGenerateRecap,
}) => {
  const [recapInput, setRecapInput] = useState('');
  const [generatedRecap, setGeneratedRecap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRecap = async () => {
    setLoading(true);
    setError('');
    setGeneratedRecap('');

    if (!recapInput.trim()) {
      setError('Por favor, forneça alguns detalhes para gerar o resumo.');
      setLoading(false);
      return;
    }

    try {
      const recap = await onGenerateRecap(matchName, recapInput);
      setGeneratedRecap(recap);
    } catch (err) {
      setError('Ocorreu um erro ao gerar o resumo. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRecapInput('');
    setGeneratedRecap('');
    setError('');
    onClose();
  };

  return (
    <Modal
      aria-labelledby="recap-modal-title"
      aria-describedby="recap-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              id="recap-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 'bold' }}
            >
              Gerar Resumo da Partida ✨
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            label="Detalhes da Partida (Ex: placar, gols, momentos marcantes)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={recapInput}
            onChange={e => setRecapInput(e.target.value)}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleGenerateRecap}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #0D47A1 30%, #2196F3 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #42A5F5 90%)',
              },
            }}
          >
            {loading ? 'Gerando...' : 'Gerar Resumo'}
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          {generatedRecap && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: '#e8f5e9',
                borderRadius: '12px',
                border: '1px solid #c8e6c9',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Seu Resumo da Partida:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {generatedRecap}
              </Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};
