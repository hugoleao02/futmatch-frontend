import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ConfiguracaoSection,
  ConfiguracoesForm,
  ESTILOS_JOGO,
  NIVEIS_COMPETITIVIDADE,
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>
                {t("settings.preferences.preferredPosition")}
              </FormLabel>
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
                      {posicao.label}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Nível Competitivo</FormLabel>
              <Tooltip
                title="Escolha seu nível de competitividade"
                arrow
                placement="right"
              >
                <Select
                  value={configuracoes.preferencias.nivelCompetitividade}
                  onChange={(e) =>
                    onChange(
                      "preferencias",
                      "nivelCompetitividade",
                      e.target.value
                    )
                  }
                >
                  {NIVEIS_COMPETITIVIDADE.map((nivel) => (
                    <MenuItem key={nivel.value} value={nivel.value}>
                      {nivel.label}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Estilo de Jogo</FormLabel>
              <Tooltip
                title="Escolha seu estilo de jogo preferido"
                arrow
                placement="right"
              >
                <Select
                  value={configuracoes.preferencias.estiloJogo}
                  onChange={(e) =>
                    onChange("preferencias", "estiloJogo", e.target.value)
                  }
                >
                  {ESTILOS_JOGO.map((estilo) => (
                    <MenuItem key={estilo.value} value={estilo.value}>
                      {estilo.label}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <SaveButton
            loading={loading}
            onClick={() => onSave("preferencias")}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
