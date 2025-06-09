import type { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
  },
  appBar: {
    background: 'linear-gradient(90deg, #1B5E20 30%, #0D47A1 90%)',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
  },
  toolbar: {
    justifyContent: 'space-between',
    px: { xs: 2, sm: 4 },
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: 1,
    flexGrow: 1,
    textAlign: 'center',
  },
  contentContainer: {
    mt: 4,
    mb: 4,
    maxWidth: '100vw',
  },
  paper: {
    p: { xs: 3, sm: 4 },
    borderRadius: '16px',
    maxWidth: '800px',
  },
  matchTitle: {
    fontWeight: 'bold',
    color: '#333',
    mb: 2,
  },
  chipContainer: {
    mb: 3,
  },
  chip: {
    mb: 1,
    mr: 1,
    fontWeight: 'bold',
  },
  infoContainer: {
    mb: 3,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
  },
  participantsList: {
    maxHeight: 200,
    overflow: 'auto',
    mb: 3,
  },
  participantItem: {
    bgcolor: '#f9f9f9',
    borderRadius: '8px',
    mb: 1,
  },
  actionButton: {
    borderRadius: '12px',
    fontWeight: 'bold',
  },
  confirmButton: {
    background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #2E7D32 30%, #66BB6A 90%)',
    },
  },
  requestButton: {
    background: 'linear-gradient(45deg, #0D47A1 30%, #2196F3 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #1976D2 30%, #42A5F5 90%)',
    },
  },
  cancelButton: {
    borderColor: '#D32F2F',
    color: '#D32F2F',
    '&:hover': {
      backgroundColor: '#FFEBEE',
      borderColor: '#D32F2F',
    },
  },
  sortButton: {
    background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)',
    color: '#333',
    '&:hover': {
      background: 'linear-gradient(45deg, #FB8C00 30%, #FFB300 90%)',
    },
  },
  requestsList: {
    maxHeight: 150,
    overflow: 'auto',
    bgcolor: '#ffe0b2',
    borderRadius: '8px',
    p: 1,
  },
  teamsContainer: {
    mt: 4,
    p: 3,
    bgcolor: '#e8f5e9',
    borderRadius: '16px',
  },
  teamPaper: {
    p: 2,
    borderRadius: '10px',
    bgcolor: '#f1f8e9',
  },
  chatContainer: {
    p: 3,
    borderRadius: '12px',
    minHeight: '150px',
    bgcolor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400 },
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
    outline: 'none',
  },
  modalTitle: {
    fontWeight: 'bold',
  },
  modalTextField: {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
} as Record<string, SxProps<Theme>>;
