import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ConfiguracaoSection,
  ConfiguracoesForm,
} from "../types/configuracoes.types";
import { SaveButton } from "./SaveButton";

interface ContatoConfigProps {
  configuracoes: ConfiguracoesForm;
  loading: boolean;
  onSave: (section: ConfiguracaoSection) => void;
  onChange: (section: ConfiguracaoSection, field: string, value: any) => void;
}

export const ContatoConfig: React.FC<ContatoConfigProps> = ({
  configuracoes,
  loading,
  onSave,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("settings.contact.title")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Tooltip
              title={t("settings.contact.nameDescription")}
              arrow
              placement="right"
            >
              <TextField
                fullWidth
                label={t("settings.contact.name")}
                value={configuracoes.contato.nome}
                onChange={(e) => onChange("contato", "nome", e.target.value)}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip
              title={t("settings.contact.emailDescription")}
              arrow
              placement="right"
            >
              <TextField
                fullWidth
                type="email"
                label={t("settings.contact.email")}
                value={configuracoes.contato.email}
                onChange={(e) => onChange("contato", "email", e.target.value)}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
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
                  onChange("contato", "telefone", e.target.value)
                }
              />
            </Tooltip>
            <FormControlLabel
              control={
                <Checkbox
                  checked={configuracoes.contato.whatsapp}
                  onChange={(e) =>
                    onChange("contato", "whatsapp", e.target.checked)
                  }
                />
              }
              label={t("settings.contact.useWhatsApp")}
            />
          </Grid>
          <Grid item xs={6}>
            <Tooltip
              title={t("settings.contact.telegramNumberDescription")}
              arrow
              placement="right"
            >
              <TextField
                fullWidth
                label={t("settings.contact.telegramNumber")}
                value={configuracoes.contato.telegramNumber}
                onChange={(e) =>
                  onChange("contato", "telegramNumber", e.target.value)
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
                        onChange("contato", "mostrarTelefone", e.target.checked)
                      }
                    />
                  }
                  label={t("settings.contact.showPhone")}
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
                        onChange("contato", "telegram", e.target.checked)
                      }
                    />
                  }
                  label={t("settings.contact.telegram")}
                />
              </Tooltip>
            </FormGroup>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <SaveButton loading={loading} onClick={() => onSave("contato")} />
        </Box>
      </CardContent>
    </Card>
  );
};
