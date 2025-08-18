import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { authScreenStyles, tabRightStyle, tabStyle } from '../styles';

// Componente principal da aplicação (Tela de Login e Cadastro)
export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState(0);

  const futmatchLogoUrl = 'src/assets/logo.png';

  return (
    <Box sx={authScreenStyles.gradientBg}>
      <Paper elevation={8} sx={authScreenStyles.paper}>
        {/* Coluna da Marca */}
        <Box sx={authScreenStyles.brandCol}>
          <Box sx={authScreenStyles.logoCircle}>
            <img
              src={futmatchLogoUrl}
              alt="Logo FutMatch"
              style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '50%' }}
              onError={e => {
                e.currentTarget.src = 'https://placehold.co/180x180/F5F5F5/333333?text=Erro+Logo';
              }}
            />
          </Box>
          <Typography variant="h3" sx={authScreenStyles.title}>
            Sua pelada
            <br />
            nunca mais
            <br />
            será a mesma.
          </Typography>
          <Typography variant="h6" sx={authScreenStyles.subtitle}>
            Conecte-se. Jogue. Divirta-se. Encontre sua partida perfeita.
          </Typography>
        </Box>
        {/* Coluna do Formulário */}
        <Box sx={authScreenStyles.formCol}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            centered
            sx={authScreenStyles.tabs}
          >
            <Tab label="Login" sx={tabStyle(activeTab === 0)} />
            <Tab label="Cadastro" sx={tabRightStyle(activeTab === 1)} />
          </Tabs>
          {activeTab === 0 ? (
            <LoginForm setActiveTab={() => setActiveTab(1)} />
          ) : (
            <RegisterForm setActiveTab={() => setActiveTab(0)} />
          )}
        </Box>
      </Paper>
    </Box>
  );
};
