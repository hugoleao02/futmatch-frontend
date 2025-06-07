import type { SxProps, Theme } from '@mui/material/styles';
import { THEME } from '../../../../shared/constants/ui';

export const homeStyles = {
  container: {
    flexGrow: 1,
    backgroundColor: THEME.colors.background.default,
    minHeight: '100vh',
    fontFamily: THEME.typography.fontFamily.primary,
  } as SxProps<Theme>,

  appBar: {
    background: `linear-gradient(90deg, ${THEME.colors.primary.main} 30%, ${THEME.colors.secondary.main} 90%)`,
    boxShadow: THEME.shadows.lg,
  } as SxProps<Theme>,

  toolbar: {
    justifyContent: 'space-between',
    px: { xs: 2, sm: 4 },
  } as SxProps<Theme>,

  logo: {
    fontWeight: THEME.typography.fontWeight.bold,
    letterSpacing: 1,
    mr: 2,
  } as SxProps<Theme>,

  subtitle: {
    display: { xs: 'none', sm: 'block' },
    opacity: 0.8,
  } as SxProps<Theme>,

  actionButton: {
    background: THEME.colors.accent.main,
    color: THEME.colors.accent.contrastText,
    fontWeight: THEME.typography.fontWeight.bold,
    boxShadow: 'none',
    '&:hover': {
      background: THEME.colors.accent.light,
      boxShadow: THEME.shadows.md,
    },
    fontSize: { xs: '0.75rem', sm: '0.9rem' },
  } as SxProps<Theme>,

  profileButton: {
    mr: 1,
    fontSize: { xs: '0.75rem', sm: '0.9rem' },
  } as SxProps<Theme>,

  logoutButton: {
    ml: 1,
  } as SxProps<Theme>,

  section: {
    p: { xs: 2, sm: 3 },
    mb: 4,
    borderRadius: THEME.borderRadius.lg,
  } as SxProps<Theme>,

  sectionTitle: {
    fontWeight: THEME.typography.fontWeight.bold,
    mb: 3,
    color: THEME.colors.text.primary,
  } as SxProps<Theme>,

  filterInput: {
    '& .MuiOutlinedInput-root': { borderRadius: THEME.borderRadius.md },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: THEME.colors.secondary.main,
      borderWidth: '2px',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: THEME.colors.secondary.main },
  } as SxProps<Theme>,

  searchButton: {
    py: 1,
    borderRadius: THEME.borderRadius.md,
    background: `linear-gradient(45deg, ${THEME.colors.accent.main} 30%, ${THEME.colors.accent.light} 90%)`,
    color: THEME.colors.accent.contrastText,
    fontWeight: THEME.typography.fontWeight.bold,
    boxShadow: 'none',
    '&:hover': {
      background: `linear-gradient(45deg, ${THEME.colors.accent.light} 30%, ${THEME.colors.accent.dark} 90%)`,
      boxShadow: THEME.shadows.md,
    },
  } as SxProps<Theme>,

  roomCard: {
    borderRadius: THEME.borderRadius.lg,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: THEME.shadows.lg,
    },
    display: 'flex',
    flexDirection: 'column',
    minHeight: '180px',
  } as SxProps<Theme>,

  matchCard: {
    borderRadius: THEME.borderRadius.lg,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: THEME.shadows.xl,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '200px',
  } as SxProps<Theme>,

  mapViewButton: {
    borderRadius: '20px',
    borderColor: THEME.colors.secondary.main,
    color: THEME.colors.secondary.main,
    fontWeight: THEME.typography.fontWeight.bold,
    '&:hover': { backgroundColor: '#E3F2FD' },
  } as SxProps<Theme>,

  mapPlaceholder: {
    p: { xs: 2, sm: 3 },
    borderRadius: THEME.borderRadius.lg,
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  } as SxProps<Theme>,

  fab: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    background: `linear-gradient(45deg, ${THEME.colors.accent.main} 30%, ${THEME.colors.accent.dark} 90%)`,
    '&:hover': {
      background: `linear-gradient(45deg, ${THEME.colors.accent.dark} 30%, #FF6F00 90%)`,
      transform: 'scale(1.05)',
    },
    boxShadow: '0px 6px 20px rgba(0,0,0,0.4)',
    transition: 'transform 0.3s ease-in-out',
  } as SxProps<Theme>,

  cardTitle: {
    fontWeight: THEME.typography.fontWeight.bold,
    color: THEME.colors.text.primary,
  } as SxProps<Theme>,

  cardActions: {
    justifyContent: 'flex-end',
    p: 2,
  } as SxProps<Theme>,

  detailsButton: {
    color: THEME.colors.secondary.main,
    fontWeight: THEME.typography.fontWeight.bold,
    '&:hover': { backgroundColor: '#E3F2FD' },
  } as SxProps<Theme>,

  recapButton: {
    color: '#F57C00',
    fontWeight: THEME.typography.fontWeight.bold,
    '&:hover': { backgroundColor: '#FFF3E0' },
  } as SxProps<Theme>,

  icon: {
    fontSize: '1rem',
    verticalAlign: 'middle',
    mr: 0.5,
  } as SxProps<Theme>,
};
