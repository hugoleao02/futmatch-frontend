import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "@mui/material";

export function Button(props: ButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="contained"
      fullWidth
      sx={{
        mt: { xs: 0.5, sm: 1 },
        bgcolor: '#00432D',
        color: '#AD9B60',
        fontWeight: 700,
        fontSize: { xs: '1.15rem', sm: '1.25rem' },
        borderRadius: 22,
        py: 1.3,
        '&:hover': { bgcolor: '#00543A', color: '#AD9B60' },
        boxShadow: 3,
        border: '2px solid #AD9B60',
        transition: '0.2s',
        ...props.sx
      }}
    />
  );
} 