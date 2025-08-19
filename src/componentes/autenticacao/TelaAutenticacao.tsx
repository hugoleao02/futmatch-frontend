import { Container, Paper } from '@mui/material';
import { useState } from 'react';

import { FormularioSection } from './FormularioSection';
import { useFormulariosAutenticacao } from './hooks';
import { MarcaSection } from './MarcaSection';
import { containerStyles, paperStyles } from './styles/TelaAutenticacao.styles';

export const TelaAutenticacao = () => {
  const [activeTab, setActiveTab] = useState(0);
  const formularios = useFormulariosAutenticacao();

  const handleTabChange = (_event: unknown, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <Paper elevation={10} sx={paperStyles}>
        <MarcaSection />
        <FormularioSection
          activeTab={activeTab}
          formularios={formularios}
          onTabChange={handleTabChange}
        />
      </Paper>
    </Container>
  );
};
