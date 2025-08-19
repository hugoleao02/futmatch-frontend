import type { SxProps, Theme } from '@mui/material';

export const buttonStyles = {
  primary: {
    backgroundColor: '#1B5E20',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2E7D32',
    },
  },
  secondary: {
    backgroundColor: '#1976D2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565C0',
    },
  },
  outline: {
    borderColor: '#1B5E20',
    color: '#1B5E20',
    '&:hover': {
      backgroundColor: 'rgba(27, 94, 32, 0.04)',
      borderColor: '#2E7D32',
    },
  },
  ghost: {
    color: '#1B5E20',
    '&:hover': {
      backgroundColor: 'rgba(27, 94, 32, 0.04)',
    },
  },
  danger: {
    backgroundColor: '#D32F2F',
    color: 'white',
    '&:hover': {
      backgroundColor: '#C62828',
    },
  },
} as const;

export const buttonSizeStyles = {
  small: {
    padding: '6px 16px',
    fontSize: '0.875rem',
    minHeight: '32px',
  },
  medium: {
    padding: '8px 24px',
    fontSize: '1rem',
    minHeight: '40px',
  },
  large: {
    padding: '12px 32px',
    fontSize: '1.125rem',
    minHeight: '48px',
  },
} as const;

export const getButtonStyles = (
  variant: keyof typeof buttonStyles,
  size: keyof typeof buttonSizeStyles,
): SxProps<Theme> => ({
  ...buttonSizeStyles[size],
  ...buttonStyles[variant],
});
