import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Logo } from '../../../shared/components/Logo';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useAuthPage } from './hooks/useAuthPage';
import {
  brandColumnStyles,
  containerStyles,
  formColumnStyles,
  paperStyles,
  tabStyles,
} from './styles/AuthPage.styles';

export function AuthPage() {
  const { activeTab, handleTabChange, setActiveTab } = useAuthPage();

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <Paper elevation={10} sx={paperStyles}>
        <Box sx={brandColumnStyles}>
          <Logo size="large" />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              lineHeight: 1.2,
              textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            }}
          >
            Sua pelada nunca mais será a mesma.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Conecte-se. Jogue. Divirta-se. Encontre sua partida perfeita.
          </Typography>
        </Box>

        <Box sx={formColumnStyles}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 5 }}
            TabIndicatorProps={{
              sx: {
                backgroundColor: '#1B5E20',
                height: 5,
                borderRadius: '5px 5px 0 0',
              },
            }}
          >
            <Tab label="Login" sx={tabStyles(activeTab, 0)} />
            <Tab label="Cadastro" sx={tabStyles(activeTab, 1)} />
          </Tabs>

          {activeTab === 0 ? <LoginForm /> : <RegisterForm setActiveTab={setActiveTab} />}
        </Box>
      </Paper>
    </Container>
  );
}
