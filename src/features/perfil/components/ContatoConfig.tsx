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
  useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Contato
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nome"
              value={configuracoes.contato.nome}
              onChange={(e) => onChange("contato", "nome", e.target.value)}
              helperText="Seu nome completo para identificação"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="email"
              label="E-mail"
              value={configuracoes.contato.email}
              onChange={(e) => onChange("contato", "email", e.target.value)}
              helperText="Seu e-mail principal para contato"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefone"
              value={configuracoes.contato.telefone}
              onChange={(e) => onChange("contato", "telefone", e.target.value)}
              helperText="Seu número de telefone para contato com outros jogadores"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={configuracoes.contato.whatsapp}
                  onChange={(e) =>
                    onChange("contato", "whatsapp", e.target.checked)
                  }
                />
              }
              label="Usar este número no WhatsApp"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Usuário do Telegram"
              value={configuracoes.contato.telegramNumber}
              onChange={(e) =>
                onChange("contato", "telegramNumber", e.target.value)
              }
              helperText="Seu nome de usuário no Telegram (opcional)"
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={configuracoes.contato.mostrarTelefone}
                    onChange={(e) =>
                      onChange("contato", "mostrarTelefone", e.target.checked)
                    }
                  />
                }
                label="Exibir número de telefone"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={configuracoes.contato.telegram}
                    onChange={(e) =>
                      onChange("contato", "telegram", e.target.checked)
                    }
                  />
                }
                label="Telegram"
              />
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
