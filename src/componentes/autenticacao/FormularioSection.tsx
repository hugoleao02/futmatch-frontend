import { Box, Tab, Tabs } from '@mui/material';
import type { ConfiguracaoFormulario } from '../../shared/types';
import { formColumnStyles, tabStyles } from './styles/TelaAutenticacao.styles';

interface FormularioSectionProps {
  activeTab: number;
  formularios: ConfiguracaoFormulario[];
  onTabChange: (event: unknown, newValue: number) => void;
}

export const FormularioSection = ({
  activeTab,
  formularios,
  onTabChange,
}: FormularioSectionProps) => {
  const formularioAtivo = formularios.find((f: ConfiguracaoFormulario) => f.id === activeTab);
  const FormularioComponent = formularioAtivo?.component;

  return (
    <Box sx={formColumnStyles}>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
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
  );
};
