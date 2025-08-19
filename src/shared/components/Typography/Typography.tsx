import { Typography as MuiTypography } from '@mui/material';
import type { TypographyProps as MuiTypographyProps } from '@mui/material';
import { forwardRef } from 'react';

export interface TypographyProps extends MuiTypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'text' | 'error' | 'warning' | 'success' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ 
    variant = 'body1', 
    weight = 'normal', 
    color = 'text', 
    align = 'left',
    children, 
    ...props 
  }, ref) => {
    const getWeight = () => {
      switch (weight) {
        case 'light':
          return 300;
        case 'medium':
          return 500;
        case 'semibold':
          return 600;
        case 'bold':
          return 700;
        default:
          return 400;
      }
    };

    const getColor = () => {
      switch (color) {
        case 'primary':
          return 'primary.main';
        case 'secondary':
          return 'secondary.main';
        case 'error':
          return 'error.main';
        case 'warning':
          return 'warning.main';
        case 'success':
          return 'success.main';
        case 'info':
          return 'info.main';
        default:
          return 'text.primary';
      }
    };

    return (
      <MuiTypography
        ref={ref}
        variant={variant}
        align={align}
        {...props}
        sx={{
          fontWeight: getWeight(),
          color: getColor(),
          lineHeight: variant.startsWith('h') ? 1.2 : 1.5,
          ...props.sx,
        }}
      >
        {children}
      </MuiTypography>
    );
  }
);

Typography.displayName = 'Typography';
