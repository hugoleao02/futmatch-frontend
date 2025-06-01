import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export function Input(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      fullWidth
      variant="outlined"
      InputLabelProps={{
        style: {
          color: '#AD9B60',
          fontWeight: 400,
          fontSize: '1.08rem',
          opacity: 0.85,
        },
        shrink: true
      }}
      InputProps={{
        style: {
          color: '#fff',
          borderRadius: 22,
          height: 54,
          fontSize: '1.08rem',
          boxShadow: 'none',
          background: '#0B4C3A',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          background: '#0B4C3A',
          '& fieldset': {
            borderColor: '#AD9B60',
            borderRadius: 22,
            borderWidth: 2,
          },
          '&:hover fieldset': { 
            borderColor: '#AD9B60',
            borderWidth: 2,
          },
          '&.Mui-focused fieldset': { 
            borderColor: '#AD9B60',
            borderWidth: 2,
          },
        },
        '& .MuiInputBase-input': {
          color: '#fff',
          caretColor: '#fff',
          padding: '0 18px',
          height: '54px',
          '&::placeholder': {
            color: '#AD9B60',
            opacity: 0.7,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#AD9B60',
          borderWidth: 2,
        },
        '& input': {
          background: 'transparent',
        },
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px #0B4C3A inset',
          WebkitTextFillColor: '#fff',
          transition: 'background-color 5000s ease-in-out 0s',
        },
        ...props.sx
      }}
    />
  );
} 