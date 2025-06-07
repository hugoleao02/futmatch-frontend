import type { SxProps, Theme } from '@mui/material';

export const textFieldStyles: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    fontSize: '1.1rem',
    height: '56px',
    '&.Mui-focused fieldset': {
      borderColor: '#1B5E20',
      borderWidth: '3px',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.1rem',
    '&.Mui-focused': {
      color: '#1B5E20',
    },
  },
};

export const formStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 'bold',
  color: 'text.primary',
  textAlign: 'center',
  mb: 2,
};

export const forgotPasswordStyles: SxProps<Theme> = {
  color: '#1B5E20',
  textDecoration: 'none',
  alignSelf: 'flex-end',
  fontWeight: 'medium',
  '&:hover': { textDecoration: 'underline' },
};

export const submitButtonStyles: SxProps<Theme> = {
  mt: 3,
  py: 1.8,
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, #2E7D32 30%, #66BB6A 90%)',
    transform: 'scale(1.03)',
    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.4)',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
};
