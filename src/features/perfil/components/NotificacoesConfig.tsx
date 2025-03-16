import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ConfiguracaoSection,
  ConfiguracoesForm,
} from "../types/configuracoes.types";

interface NotificacoesConfigProps {
  configuracoes: ConfiguracoesForm;
  loading: boolean;
  onSave: (section: ConfiguracaoSection) => void;
  onChange: (section: ConfiguracaoSection, field: string, value: any) => void;
}

export const NotificacoesConfig: React.FC<NotificacoesConfigProps> = ({
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
          {t("settings.notifications.title")}
        </Typography>
        <FormGroup>
          <Tooltip
            title={t("settings.notifications.receiveNotificationsDescription")}
            arrow
            placement="right"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.notificacoes.receberNotificacoes}
                  onChange={(e) =>
                    onChange(
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
            title={t("settings.notifications.emailNotificationsDescription")}
            arrow
            placement="right"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.notificacoes.notificacoesEmail}
                  onChange={(e) =>
                    onChange(
                      "notificacoes",
                      "notificacoesEmail",
                      e.target.checked
                    )
                  }
                  disabled={!configuracoes.notificacoes.receberNotificacoes}
                />
              }
              label={t("settings.notifications.emailNotifications")}
            />
          </Tooltip>
          <Tooltip
            title={t("settings.notifications.pushNotificationsDescription")}
            arrow
            placement="right"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.notificacoes.notificacoesPush}
                  onChange={(e) =>
                    onChange(
                      "notificacoes",
                      "notificacoesPush",
                      e.target.checked
                    )
                  }
                  disabled={!configuracoes.notificacoes.receberNotificacoes}
                />
              }
              label={t("settings.notifications.pushNotifications")}
            />
          </Tooltip>
        </FormGroup>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => onSave("notificacoes")}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("settings.saveButton")
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
