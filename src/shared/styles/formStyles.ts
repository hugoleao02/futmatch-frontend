import type { SxProps, Theme } from '@mui/material';
import { THEME } from '../constants';

// Estilos base para campos de texto
export const baseTextFieldStyles: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: THEME.borderRadius.lg,
    fontSize: THEME.typography.fontSize.lg,
    height: '56px',
    '&.Mui-focused fieldset': {
      borderColor: THEME.colors.primary.main,
      borderWidth: '3px',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: THEME.typography.fontSize.lg,
    '&.Mui-focused': {
      color: THEME.colors.primary.main,
    },
  },
};

// Estilos base para formulários
export const baseFormStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

// Estilos base para títulos
export const baseTitleStyles: SxProps<Theme> = {
  fontWeight: THEME.typography.fontWeight.bold,
  color: THEME.colors.text.primary,
  textAlign: 'center',
  mb: 2,
};

// Estilos base para botões de submit
export const baseSubmitButtonStyles: SxProps<Theme> = {
  mt: { xs: 0.5, sm: 1 },
  bgcolor: THEME.colors.primary.main,
  color: THEME.colors.primary.contrastText,
  fontWeight: THEME.typography.fontWeight.bold,
  fontSize: { xs: THEME.typography.fontSize.lg, sm: THEME.typography.fontSize.xl },
  borderRadius: THEME.borderRadius.full,
  py: 1.3,
  '&:hover': {
    bgcolor: THEME.colors.primary.dark,
  },
  boxShadow: THEME.shadows.md,
  transition: '0.2s',
};

// Estilos base para checkboxes
export const baseCheckboxStyles: SxProps<Theme> = {
  color: THEME.colors.primary.main,
  '&.Mui-checked': { color: THEME.colors.primary.main },
  transform: 'scale(1.2)',
};
