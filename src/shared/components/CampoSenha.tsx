import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

interface CampoSenhaProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText?: string;
  required?: boolean;
  sx?: any;
}

export const CampoSenha = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  sx,
}: CampoSenhaProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      required={required}
      sx={sx}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
              sx={{ color: 'text.secondary' }}
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: '1.5rem' }} />
              ) : (
                <Visibility sx={{ fontSize: '1.5rem' }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
