import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    bgcolor: '#f5f5f5',
  },
  appBar: {
    bgcolor: '#1B5E20',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 600,
  },
  paper: {
    maxWidth: 600,
    mx: 'auto',
    mt: 4,
    p: 4,
    borderRadius: 2,
  },
  formTitle: {
    mb: 4,
    color: '#1B5E20',
    fontWeight: 600,
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1B5E20',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1B5E20',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#1B5E20',
    },
  },
  dateTimeContainer: {
    display: 'flex',
    gap: 2,
  },
  dateTimeField: {
    flex: 1,
  },
  submitButton: {
    mt: 2,
    bgcolor: '#1B5E20',
    '&:hover': {
      bgcolor: '#2E7D32',
    },
  },
};
