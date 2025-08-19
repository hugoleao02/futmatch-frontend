import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import type { ConfiguracaoFormulario } from '../../shared/types';
import { useFormulariosAutenticacao } from './hooks';
import {
  brandColumnStyles,
  containerStyles,
  formColumnStyles,
  paperStyles,
  tabStyles,
} from './styles/TelaAutenticacao.styles';

export const TelaAutenticacao = () => {
  const [activeTab, setActiveTab] = useState(0);
  const formularios = useFormulariosAutenticacao();

  const handleTabChange = (_event: unknown, newValue: number) => {
    setActiveTab(newValue);
  };

  const formularioAtivo = formularios.find((f: ConfiguracaoFormulario) => f.id === activeTab);
  const FormularioComponent = formularioAtivo?.component;

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <Paper elevation={10} sx={paperStyles}>
        <Box sx={brandColumnStyles}>
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
            {formularios.map((formulario: ConfiguracaoFormulario) => (
              <Tab
                key={formulario.id}
                label={formulario.label}
                sx={tabStyles(activeTab, formulario.id)}
              />
            ))}
          </Tabs>

          {FormularioComponent && <FormularioComponent {...formularioAtivo.props} />}
        </Box>
      </Paper>
    </Container>
  );
};
