import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface CancelDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelDialog({ open, onClose, onConfirm }: CancelDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="cancel-dialog-title"
      aria-describedby="cancel-dialog-description"
    >
      <DialogTitle id="cancel-dialog-title">{'Confirmar Cancelamento da Partida?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="cancel-dialog-description">
          Tem certeza que deseja cancelar esta partida? Esta ação não pode ser desfeita e todos os
          participantes serão notificados.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Não
        </Button>
        <Button onClick={onConfirm} autoFocus color="error" variant="contained">
          Sim, Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
