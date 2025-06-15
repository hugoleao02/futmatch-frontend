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
import { useState } from 'react';
import { styles } from '../styles.ts';

interface SortTeamsModalProps {
  open: boolean;
  onClose: () => void;
  onSort: (numTimes: number) => Promise<void>;
  maxTeams: number;
}

export function SortTeamsModal({ open, onClose, onSort, maxTeams }: SortTeamsModalProps) {
  const [numTimes, setNumTimes] = useState(2);
  const [loadingSort, setLoadingSort] = useState(false);

  const handleClose = () => {
    onClose();
    setLoadingSort(false);
  };

  const realizarSorteioTimes = async () => {
    setLoadingSort(true);
    try {
      await onSort(numTimes);
      handleClose();
    } catch (error) {
    } finally {
      setLoadingSort(false);
    }
  };

  return (
    <Modal
      aria-labelledby="sort-teams-modal-title"
      aria-describedby="sort-teams-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={styles.modalContainer}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              id="sort-teams-modal-title"
              variant="h6"
              component="h2"
              sx={styles.modalTitle}
            >
              Configurar Sorteio de Times
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="sort-teams-modal-description" sx={{ mt: 2, mb: 3 }}>
            Quantos times você gostaria de formar? (Máx: {maxTeams})
          </Typography>
          <TextField
            label="Número de Times"
            type="number"
            fullWidth
            value={numTimes}
            onChange={e =>
              setNumTimes(Math.max(2, Math.min(parseInt(e.target.value) || 2, maxTeams)))
            }
            inputProps={{ min: 2, max: maxTeams }}
            sx={styles.modalTextField}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={realizarSorteioTimes}
            disabled={loadingSort || numTimes * 2 > maxTeams * 2}
            sx={styles.actionButton}
          >
            {loadingSort ? <CircularProgress size={24} color="inherit" /> : 'Sortear Agora'}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
