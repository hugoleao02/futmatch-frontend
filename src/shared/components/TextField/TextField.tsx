import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';
import { forwardRef } from 'react';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant' | 'size'> {
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      variant = 'outlined',
      size = 'medium',
      error = false,
      helperText,
      fullWidth = true,
      required = false,
      ...props
    },
    ref,
  ) => {
    return (
      <MuiTextField
        ref={ref}
        variant={variant}
        size={size}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        required={required}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? 'error.main' : 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? 'error.main' : 'primary.main',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: error ? 'error.main' : 'text.secondary',
            '&.Mui-focused': {
              color: error ? 'error.main' : 'primary.main',
            },
          },
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            fontSize: '0.75rem',
          },
          ...props.sx,
        }}
      />
    );
  },
);

TextField.displayName = 'TextField';
