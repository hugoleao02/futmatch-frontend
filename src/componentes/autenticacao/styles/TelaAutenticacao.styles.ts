export const containerStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: 4,
  px: 2,
  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
} as const;

export const paperStyles = {
  display: 'flex',
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  maxWidth: 1200,
  width: '100%',
  minHeight: 600,
} as const;

export const brandColumnStyles = {
  flex: 1,
  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  p: 6,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
} as const;

export const formColumnStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  p: 6,
  backgroundColor: 'background.paper',
} as const;

export const tabStyles = (activeTab: number, tabIndex: number) => ({
  fontWeight: activeTab === tabIndex ? 'bold' : 'normal',
  color: activeTab === tabIndex ? 'primary.main' : 'text.secondary',
  fontSize: '1.1rem',
  py: 2,
  px: 4,
});


