import type { SxProps, Theme } from '@mui/material';

// Re-export shared form styles
export {
  baseCheckboxStyles as checkboxStyles,
  baseFormStyles as formStyles,
  baseTextFieldStyles as textFieldStyles,
  baseTitleStyles as titleStyles,
} from '../../../../shared/styles/formStyles.ts';

export const linkStyles: SxProps<Theme> = {
  color: '#1B5E20',
  textDecoration: 'none',
  fontWeight: 'bold',
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

export const loginLinkStyles: SxProps<Theme> = {
  color: 'text.secondary',
  textAlign: 'center',
  mt: 3,
};
