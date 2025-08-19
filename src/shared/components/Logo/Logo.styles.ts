import type { SxProps, Theme } from '@mui/material';
import { THEME } from '../../styles/theme';

export const logoStyles = (size: 'small' | 'large'): SxProps<Theme> => {
  const dimensions = size === 'large' ? { xs: 80, sm: 100 } : { xs: 48, sm: 58 };
  const borderWidth = size === 'large' ? 4 : 3;

  return {
    width: dimensions,
    height: dimensions,
    objectFit: 'contain',
    boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)',
    borderRadius: '50%',
    background: THEME.colors.primary.main,
    border: `${borderWidth}px solid ${THEME.colors.secondary.main}`,
    position: 'relative',
    top: 0,
  };
};
