import type { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  minWidth: '100vw',
  background: 'linear-gradient(135deg, #0D47A1 0%, #1A237E 50%, #212121 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: { xs: 2, sm: 3, lg: 4 },
  fontFamily: 'Inter, sans-serif',
};

export const paperStyles: SxProps<Theme> = {
  borderRadius: '24px',
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  width: '100%',
  maxWidth: '1100px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.005)',
  },
};

export const brandColumnStyles: SxProps<Theme> = {
  width: { xs: '100%', lg: '50%' },
  p: { xs: 4, sm: 6 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(45deg, #1B5E20 0%, #0D47A1 50%, #FFB300 100%)',
  color: 'white',
  borderRadius: { lg: '24px 0 0 24px' },
};

export const formColumnStyles: SxProps<Theme> = {
  width: { xs: '100%', lg: '50%' },
  p: { xs: 4, sm: 6, md: 8 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: { xs: 600, sm: 700, md: 760 },
};

export const tabStyles = (activeTab: number, tabIndex: number): SxProps<Theme> => ({
  fontSize: { xs: '1.1rem', sm: '1.3rem' },
  fontWeight: 'bold',
  textTransform: 'none',
  color: activeTab === tabIndex ? '#1B5E20' : 'text.secondary',
  '&.Mui-selected': {
    color: '#1B5E20',
  },
  borderRadius: '10px 10px 0 0',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#E8F5E9',
    transform: 'scale(1.03)',
  },
});
