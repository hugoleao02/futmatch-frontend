import { Box } from '@mui/material';
import logo from '../../../assets/logo.png';

interface LogoProps {
  size?: 'small' | 'large';
}

export function Logo({ size = 'large' }: LogoProps) {
  const dimensions = size === 'large' 
    ? { xs: 80, sm: 100 }
    : { xs: 48, sm: 58 };

  const borderWidth = size === 'large' ? 4 : 3;

  return (
    <Box
      component="img"
      src={logo}
      alt="Logo FutMatch"
      sx={{
        width: dimensions,
        height: dimensions,
        objectFit: 'contain',
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)',
        borderRadius: '50%',
        background: '#00432D',
        border: `${borderWidth}px solid #AD9B60`,
        position: 'relative',
        top: 0,
      }}
    />
  );
} 