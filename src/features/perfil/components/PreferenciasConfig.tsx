import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ConfiguracaoSection,
  ConfiguracoesForm,
  POSICOES,
} from "../types/configuracoes.types";
import { SaveButton } from "./SaveButton";

interface PreferenciasConfigProps {
  configuracoes: ConfiguracoesForm;
  loading: boolean;
  onSave: (section: ConfiguracaoSection) => void;
  onChange: (section: ConfiguracaoSection, field: string, value: any) => void;
}

export const PreferenciasConfig: React.FC<PreferenciasConfigProps> = ({
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
          {t("settings.preferences.title")}
        </Typography>
        <FormControl fullWidth>
          <FormLabel>{t("settings.preferences.preferredPosition")}</FormLabel>
          <Tooltip
            title={t("settings.preferences.preferredPositionDescription")}
            arrow
            placement="right"
          >
            <Select
              value={configuracoes.preferencias.posicao}
              onChange={(e) =>
                onChange("preferencias", "posicao", e.target.value)
              }
            >
              {POSICOES.map((posicao) => (
                <MenuItem key={posicao.value} value={posicao.value}>
                  {t(`auth.register.positions.${posicao.value.toLowerCase()}`)}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <SaveButton
            loading={loading}
            onClick={() => onSave("preferencias")}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
