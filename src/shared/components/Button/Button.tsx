import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { forwardRef } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'medium', loading = false, children, disabled, ...props },
    ref,
  ) => {
    const getVariantProps = () => {
      switch (variant) {
        case 'primary':
          return { variant: 'contained' as const, color: 'primary' as const };
        case 'secondary':
          return { variant: 'contained' as const, color: 'secondary' as const };
        case 'outline':
          return { variant: 'outlined' as const, color: 'primary' as const };
        case 'ghost':
          return { variant: 'text' as const, color: 'primary' as const };
        case 'danger':
          return { variant: 'contained' as const, color: 'error' as const };
        default:
          return { variant: 'contained' as const, color: 'primary' as const };
      }
    };

    const getSizeProps = () => {
      switch (size) {
        case 'small':
          return { size: 'small' as const };
        case 'large':
          return { size: 'large' as const };
        default:
          return { size: 'medium' as const };
      }
    };

    const isDisabled = disabled || loading;

    return (
      <MuiButton
        ref={ref}
        {...getVariantProps()}
        {...getSizeProps()}
        disabled={isDisabled}
        {...props}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: variant === 'primary' || variant === 'secondary' ? 2 : 'none',
          '&:hover': {
            boxShadow: variant === 'primary' || variant === 'secondary' ? 4 : 'none',
          },
          ...props.sx,
        }}
      >
        {loading ? 'Carregando...' : children}
      </MuiButton>
    );
  },
);

Button.displayName = 'Button';
