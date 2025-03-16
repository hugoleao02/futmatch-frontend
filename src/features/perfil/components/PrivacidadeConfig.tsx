import {
  Box,
  Card,
  CardContent,
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
import { SaveButton } from "./SaveButton";

interface PrivacidadeConfigProps {
  configuracoes: ConfiguracoesForm;
  loading: boolean;
  onSave: (section: ConfiguracaoSection) => void;
  onChange: (section: ConfiguracaoSection, field: string, value: any) => void;
}

export const PrivacidadeConfig: React.FC<PrivacidadeConfigProps> = ({
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
                    onChange("privacidade", "perfilPublico", e.target.checked)
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
                  checked={configuracoes.privacidade.mostrarEstatisticas}
                  onChange={(e) =>
                    onChange(
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
                  checked={configuracoes.privacidade.mostrarHistoricoPartidas}
                  onChange={(e) =>
                    onChange(
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
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <SaveButton loading={loading} onClick={() => onSave("privacidade")} />
        </Box>
      </CardContent>
    </Card>
  );
};
