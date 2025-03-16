import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { PosicaoType } from "../../../@types/enums";
import { useAuth } from "../../../contexts/AuthContext";
import { useConfiguracoes } from "../hooks/useConfiguracoes";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const posicoes = [
  { value: "GOLEIRO" as PosicaoType, label: "Goleiro" },
  { value: "ZAGUEIRO" as PosicaoType, label: "Zagueiro" },
  { value: "LATERAL" as PosicaoType, label: "Lateral" },
  { value: "VOLANTE" as PosicaoType, label: "Volante" },
  { value: "MEIA" as PosicaoType, label: "Meia" },
  { value: "ATACANTE" as PosicaoType, label: "Atacante" },
];

const Configuracoes: React.FC = () => {
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
                <Tab label={t("settings.notifications.title")} />
                <Tab label={t("settings.appearance.title")} />
                <Tab label={t("settings.preferences.title")} />
                <Tab label={t("settings.privacy.title")} />
                <Tab label={t("settings.contact.title")} />
              </Tabs>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            {/* Notificações */}
            <TabPanel value={currentTab} index={0}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t("settings.notifications.title")}
                  </Typography>
                  <FormGroup>
                    <Tooltip
                      title={t(
                        "settings.notifications.receiveNotificationsDescription"
                      )}
                      arrow
                      placement="right"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              configuracoes.notificacoes.receberNotificacoes
                            }
                            onChange={(e) =>
                              handleChange(
                                "notificacoes",
                                "receberNotificacoes",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={t("settings.notifications.receiveNotifications")}
                      />
                    </Tooltip>
                    <Tooltip
                      title={t(
                        "settings.notifications.emailNotificationsDescription"
                      )}
                      arrow
                      placement="right"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              configuracoes.notificacoes.notificacoesEmail
                            }
                            onChange={(e) =>
                              handleChange(
                                "notificacoes",
                                "notificacoesEmail",
                                e.target.checked
                              )
                            }
                            disabled={
                              !configuracoes.notificacoes.receberNotificacoes
                            }
                          />
                        }
                        label={t("settings.notifications.emailNotifications")}
                      />
                    </Tooltip>
                    <Tooltip
                      title={t(
                        "settings.notifications.pushNotificationsDescription"
                      )}
                      arrow
                      placement="right"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              configuracoes.notificacoes.notificacoesPush
                            }
                            onChange={(e) =>
                              handleChange(
                                "notificacoes",
                                "notificacoesPush",
                                e.target.checked
                              )
                            }
                            disabled={
                              !configuracoes.notificacoes.receberNotificacoes
                            }
                          />
                        }
                        label={t("settings.notifications.pushNotifications")}
                      />
                    </Tooltip>
                  </FormGroup>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave("notificacoes")}
                      disabled={configLoading}
                    >
                      {configLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("settings.saveButton")
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Aparência */}
            <TabPanel value={currentTab} index={1}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t("settings.appearance.title")}
                  </Typography>
                  <FormControl fullWidth>
                    <FormLabel>{t("settings.appearance.theme")}</FormLabel>
                    <Tooltip
                      title={t("settings.appearance.themeDescription")}
                      arrow
                      placement="right"
                    >
                      <Select
                        value={tema}
                        onChange={(e) =>
                          handleTemaChange(
                            e.target.value as "light" | "dark" | "system"
                          )
                        }
                      >
                        <MenuItem value="light">
                          {t("settings.appearance.light")}
                        </MenuItem>
                        <MenuItem value="dark">
                          {t("settings.appearance.dark")}
                        </MenuItem>
                        <MenuItem value="system">
                          {t("settings.appearance.system")}
                        </MenuItem>
                      </Select>
                    </Tooltip>
                  </FormControl>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave("aparencia")}
                      disabled={configLoading}
                    >
                      {configLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("settings.saveButton")
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Preferências */}
            <TabPanel value={currentTab} index={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t("settings.preferences.title")}
                  </Typography>
                  <FormControl fullWidth>
                    <FormLabel>
                      {t("settings.preferences.preferredPosition")}
                    </FormLabel>
                    <Tooltip
                      title={t(
                        "settings.preferences.preferredPositionDescription"
                      )}
                      arrow
                      placement="right"
                    >
                      <Select
                        value={configuracoes.preferencias.posicao}
                        onChange={(e) =>
                          handleChange(
                            "preferencias",
                            "posicao",
                            e.target.value
                          )
                        }
                      >
                        {posicoes.map((posicao) => (
                          <MenuItem key={posicao.value} value={posicao.value}>
                            {t(
                              `auth.register.positions.${posicao.value.toLowerCase()}`
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                    </Tooltip>
                  </FormControl>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave("preferencias")}
                      disabled={configLoading}
                    >
                      {configLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("settings.saveButton")
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Privacidade */}
            <TabPanel value={currentTab} index={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t("settings.privacy.title")}
                  </Typography>
                  <FormGroup>
                    <Tooltip
                      title={t("settings.privacy.publicProfileDescription")}
                      arrow
                      placement="right"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={configuracoes.privacidade.perfilPublico}
                            onChange={(e) =>
                              handleChange(
                                "privacidade",
                                "perfilPublico",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={t("settings.privacy.publicProfile")}
                      />
                    </Tooltip>
                    <Tooltip
                      title={t("settings.privacy.showStatisticsDescription")}
                      arrow
                      placement="right"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              configuracoes.privacidade.mostrarEstatisticas
                            }
                            onChange={(e) =>
                              handleChange(
                                "privacidade",
                                "mostrarEstatisticas",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={t("settings.privacy.showStatistics")}
                      />
                    </Tooltip>
                    <Tooltip
                      title={t("settings.privacy.showMatchHistoryDescription")}
                      arrow
                      placement="right"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              configuracoes.privacidade.mostrarHistoricoPartidas
                            }
                            onChange={(e) =>
                              handleChange(
                                "privacidade",
                                "mostrarHistoricoPartidas",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={t("settings.privacy.showMatchHistory")}
                      />
                    </Tooltip>
                  </FormGroup>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave("privacidade")}
                      disabled={configLoading}
                    >
                      {configLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("settings.saveButton")
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Contato */}
            <TabPanel value={currentTab} index={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t("settings.contact.title")}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Tooltip
                        title={t("settings.contact.phoneDescription")}
                        arrow
                        placement="right"
                      >
                        <TextField
                          fullWidth
                          label={t("settings.contact.phone")}
                          value={configuracoes.contato.telefone}
                          onChange={(e) =>
                            handleChange("contato", "telefone", e.target.value)
                          }
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <FormGroup>
                        <Tooltip
                          title={t("settings.contact.showPhoneDescription")}
                          arrow
                          placement="right"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={configuracoes.contato.mostrarTelefone}
                                onChange={(e) =>
                                  handleChange(
                                    "contato",
                                    "mostrarTelefone",
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={t("settings.contact.showPhone")}
                          />
                        </Tooltip>
                        <Tooltip
                          title={t("settings.contact.whatsappDescription")}
                          arrow
                          placement="right"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={configuracoes.contato.whatsapp}
                                onChange={(e) =>
                                  handleChange(
                                    "contato",
                                    "whatsapp",
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={t("settings.contact.whatsapp")}
                          />
                        </Tooltip>
                        <Tooltip
                          title={t("settings.contact.telegramDescription")}
                          arrow
                          placement="right"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={configuracoes.contato.telegram}
                                onChange={(e) =>
                                  handleChange(
                                    "contato",
                                    "telegram",
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={t("settings.contact.telegram")}
                          />
                        </Tooltip>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave("contato")}
                      disabled={configLoading}
                    >
                      {configLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("settings.saveButton")
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Configuracoes;
