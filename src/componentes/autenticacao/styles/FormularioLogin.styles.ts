import type { SxProps, Theme } from '@mui/material';
import { THEME } from '../../../shared';

// Re-export estilos base
export {
  baseFormStyles as formStyles,
  baseSubmitButtonStyles as submitButtonStyles,
  baseTextFieldStyles as textFieldStyles,
  baseTitleStyles as titleStyles,
} from '../../../shared';

export const forgotPasswordStyles: SxProps<Theme> = {
  color: THEME.colors.primary.main,
  textDecoration: 'none',
  alignSelf: 'flex-end',
  fontWeight: THEME.typography.fontWeight.medium,
  '&:hover': {
    textDecoration: 'underline',
    color: THEME.colors.primary.dark,
  },
};
