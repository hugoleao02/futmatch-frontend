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
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { PosicaoType } from "../../../@types/enums";
import { useConfiguracoes } from "../hooks/useConfiguracoes";

const posicoes = [
  { value: "GOLEIRO" as PosicaoType, label: "Goleiro" },
  { value: "ZAGUEIRO" as PosicaoType, label: "Zagueiro" },
  { value: "LATERAL" as PosicaoType, label: "Lateral" },
  { value: "VOLANTE" as PosicaoType, label: "Volante" },
  { value: "MEIA" as PosicaoType, label: "Meia" },
  { value: "ATACANTE" as PosicaoType, label: "Atacante" },
];

const Configuracoes: React.FC = () => {
  const { t } = useTranslation();
  const {
    loading,
    configuracoes,
    configuracoesVisuais,
    handleChange,
    handleTemaChange,
    handleSave,
  } = useConfiguracoes();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("settings.title")}
        </Typography>

        <Grid container spacing={3}>
          {/* Notificações */}
          <Grid item xs={12} md={6}>
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
                          checked={configuracoes.receberNotificacoes}
                          onChange={(e) =>
                            handleChange(
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
                          checked={configuracoes.notificacoesEmail}
                          onChange={(e) =>
                            handleChange("notificacoesEmail", e.target.checked)
                          }
                          disabled={!configuracoes.receberNotificacoes}
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
                          checked={configuracoes.notificacoesPush}
                          onChange={(e) =>
                            handleChange("notificacoesPush", e.target.checked)
                          }
                          disabled={!configuracoes.receberNotificacoes}
                        />
                      }
                      label={t("settings.notifications.pushNotifications")}
                    />
                  </Tooltip>
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>

          {/* Aparência */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t("settings.appearance.title")}
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>{t("settings.appearance.theme")}</FormLabel>
                  <Tooltip
                    title={t("settings.appearance.themeDescription")}
                    arrow
                    placement="right"
                  >
                    <Select
                      value={configuracoesVisuais.tema}
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
              </CardContent>
            </Card>
          </Grid>

          {/* Preferências */}
          <Grid item xs={12} md={6}>
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
                      value={configuracoes.posicaoPreferida}
                      onChange={(e) =>
                        handleChange("posicaoPreferida", e.target.value)
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
              </CardContent>
            </Card>
          </Grid>

          {/* Privacidade */}
          <Grid item xs={12} md={6}>
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
                          checked={configuracoes.perfilPublico}
                          onChange={(e) =>
                            handleChange("perfilPublico", e.target.checked)
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
                          checked={configuracoes.mostrarEstatisticas}
                          onChange={(e) =>
                            handleChange(
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
                          checked={configuracoes.mostrarHistoricoPartidas}
                          onChange={(e) =>
                            handleChange(
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
          >
            {t("settings.saveButton")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Configuracoes;
