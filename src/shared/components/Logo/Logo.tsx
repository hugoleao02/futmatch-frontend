import { Box } from '@mui/material';
import LogoImg from '../../assets/logo.png';
import { logoStyles } from './Logo.styles';

interface LogoProps {
  size?: 'small' | 'large';
}

export function Logo({ size = 'large' }: LogoProps) {
  return <Box component="img" src={LogoImg} alt="Logo FutMatch" sx={logoStyles(size)} />;
}
