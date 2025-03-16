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
import { ConfiguracaoSection } from "../types/configuracoes.types";
import { SaveButton } from "./SaveButton";

interface AparenciaConfigProps {
  tema: "light" | "dark" | "system";
  loading: boolean;
  onTemaChange: (tema: "light" | "dark" | "system") => void;
  onSave: (section: ConfiguracaoSection) => void;
}

export const AparenciaConfig: React.FC<AparenciaConfigProps> = ({
  tema,
  loading,
  onTemaChange,
  onSave,
}) => {
  const { t } = useTranslation();

  return (
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
                onTemaChange(e.target.value as "light" | "dark" | "system")
              }
            >
              <MenuItem value="light">
                {t("settings.appearance.light")}
              </MenuItem>
              <MenuItem value="dark">{t("settings.appearance.dark")}</MenuItem>
              <MenuItem value="system">
                {t("settings.appearance.system")}
              </MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <SaveButton loading={loading} onClick={() => onSave("aparencia")} />
        </Box>
      </CardContent>
    </Card>
  );
};
