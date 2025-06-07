import { Box, Typography, Paper, Tabs, Tab, Container } from "@mui/material";
import { Logo } from "./components/Logo";
import React, { useState } from 'react';
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export function LoginPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(135deg, #0D47A1 0%, #1A237E 50%, #212121 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3, lg: 4 },
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Paper
        elevation={10}
        sx={{
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
        }}
      >
        <Box
          sx={{
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
          }}
        >
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

        <Box
          sx={{
            width: { xs: '100%', lg: '50%' },
            p: { xs: 4, sm: 6, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
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
            <Tab
              label="Login"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                fontWeight: 'bold',
                textTransform: 'none',
                color: activeTab === 0 ? '#1B5E20' : 'text.secondary',
                '&.Mui-selected': {
                  color: '#1B5E20',
                },
                borderRadius: '10px 10px 0 0',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#E8F5E9',
                  transform: 'scale(1.03)',
                },
              }}
            />
            <Tab
              label="Cadastro"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                fontWeight: 'bold',
                textTransform: 'none',
                color: activeTab === 1 ? '#1B5E20' : 'text.secondary',
                '&.Mui-selected': {
                  color: '#1B5E20',
                },
                borderRadius: '10px 10px 0 0',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#E8F5E9',
                  transform: 'scale(1.03)',
                },
              }}
            />
          </Tabs>

          {activeTab === 0 ? (
            <LoginForm setActiveTab={setActiveTab} />
          ) : (
            <RegisterForm setActiveTab={setActiveTab} />
          )}
        </Box>
      </Paper>
    </Container>
  );
}
