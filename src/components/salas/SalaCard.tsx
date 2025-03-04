import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Sala } from "../../types/api";

interface SalaCardProps {
  sala: Sala;
  onVerDetalhes: (salaId: number) => void;
}

const SalaCard: React.FC<SalaCardProps> = ({ sala, onVerDetalhes }) => {
  const { t } = useTranslation();

  const getNivelLabel = (min: number, max: number) => {
    if (min <= 3 && max <= 3) return t("Iniciante");
    if (min >= 8) return t("Avançado");
    return t("Intermediário");
  };

  const getNivelColor = (min: number, max: number) => {
    if (min <= 3 && max <= 3) return "success";
    if (min >= 8) return "error";
    return "warning";
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {sala.nome}
        </Typography>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Chip
            size="small"
            label={getNivelLabel(sala.nivelMinimo, sala.nivelMaximo)}
            color={getNivelColor(sala.nivelMinimo, sala.nivelMaximo) as any}
            sx={{ mr: 1 }}
          />
          {sala.isPublica ? (
            <Chip size="small" label={t("Pública")} />
          ) : (
            <Chip size="small" label={t("Privada")} color="default" />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon
            fontSize="small"
            sx={{ mr: 1, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary" noWrap>
            {sala.localizacao}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <AccessTimeIcon
            fontSize="small"
            sx={{ mr: 1, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            {dayjs(sala.dataHora).format("DD/MM/YYYY [às] HH:mm")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PeopleIcon
            fontSize="small"
            sx={{ mr: 1, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            {sala.jogadores.length}/{sala.numeroJogadores} {t("jogadores")}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() => onVerDetalhes(sala.id)}
        >
          {t("Ver Detalhes")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default SalaCard;
