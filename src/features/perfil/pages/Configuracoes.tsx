import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { AparenciaConfig } from "../components/AparenciaConfig";
import { ConfiguracaoTabPanel } from "../components/ConfiguracaoTabPanel";
import { ContatoConfig } from "../components/ContatoConfig";
import { NotificacoesConfig } from "../components/NotificacoesConfig";
import { PreferenciasConfig } from "../components/PreferenciasConfig";
import { PrivacidadeConfig } from "../components/PrivacidadeConfig";
import { useConfiguracoes } from "../hooks/useConfiguracoes";

const ConfiguracoesPage: React.FC = () => {
  const { isAuthenticated, loading, initialLoadComplete } = useAuth();
  const { t } = useTranslation();
  const {
    loading: configLoading,
    configuracoes,
    tema,
    handleChange,
    handleTemaChange,
    handleSave,
  } = useConfiguracoes();
  const [currentTab, setCurrentTab] = useState(0);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (initialLoadComplete && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const configTabs = [
    { label: "settings.notifications.title", component: NotificacoesConfig },
    { label: "settings.appearance.title", component: AparenciaConfig },
    { label: "settings.preferences.title", component: PreferenciasConfig },
    { label: "settings.privacy.title", component: PrivacidadeConfig },
    { label: "settings.contact.title", component: ContatoConfig },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("settings.title")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <Tabs
                orientation="vertical"
                value={currentTab}
                onChange={handleTabChange}
                aria-label="configurações tabs"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    pl: 2,
                  },
                }}
              >
                {configTabs.map((tab, index) => (
                  <Tab key={index} label={t(tab.label)} />
                ))}
              </Tabs>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            {configTabs.map((tab, index) => (
              <ConfiguracaoTabPanel
                key={index}
                value={currentTab}
                index={index}
              >
                {tab.component === NotificacoesConfig && (
                  <NotificacoesConfig
                    configuracoes={configuracoes}
                    loading={configLoading}
                    onChange={handleChange}
                    onSave={handleSave}
                  />
                )}
                {tab.component === AparenciaConfig && (
                  <AparenciaConfig
                    tema={tema}
                    loading={configLoading}
                    onTemaChange={handleTemaChange}
                    onSave={handleSave}
                  />
                )}
                {tab.component === PreferenciasConfig && (
                  <PreferenciasConfig
                    configuracoes={configuracoes}
                    loading={configLoading}
                    onChange={handleChange}
                    onSave={handleSave}
                  />
                )}
                {tab.component === PrivacidadeConfig && (
                  <PrivacidadeConfig
                    configuracoes={configuracoes}
                    loading={configLoading}
                    onChange={handleChange}
                    onSave={handleSave}
                  />
                )}
                {tab.component === ContatoConfig && (
                  <ContatoConfig
                    configuracoes={configuracoes}
                    loading={configLoading}
                    onChange={handleChange}
                    onSave={handleSave}
                  />
                )}
              </ConfiguracaoTabPanel>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConfiguracoesPage;
