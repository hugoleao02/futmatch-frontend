import type { SxProps, Theme } from '@mui/material';
import { THEME } from '../../../shared';

// Re-export estilos base
export {
  baseCheckboxStyles as checkboxStyles,
  baseFormStyles as formStyles,
  baseSubmitButtonStyles as submitButtonStyles,
  baseTextFieldStyles as textFieldStyles,
  baseTitleStyles as titleStyles,
} from '../../../shared';

export const linkStyles: SxProps<Theme> = {
  color: THEME.colors.primary.main,
  textDecoration: 'none',
  fontWeight: THEME.typography.fontWeight.bold,
  '&:hover': {
    textDecoration: 'underline',
    color: THEME.colors.primary.dark,
  },
};

export const loginLinkStyles: SxProps<Theme> = {
  color: THEME.colors.text.secondary,
  textAlign: 'center',
  mt: 3,
};
