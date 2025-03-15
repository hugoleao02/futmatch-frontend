import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Sala } from "../../@types/sala";

interface SalaCardProps {
  sala: Sala;
  onVerDetalhes: (salaId: string | number) => void;
}

const SalaCard: React.FC<SalaCardProps> = ({ sala, onVerDetalhes }) => {
  const { t } = useTranslation();

  const getNivelLabel = (min: number | undefined, max: number | undefined) => {
    if (!min || !max) return t("Todos os níveis");
    if (min <= 3 && max <= 3) return t("Iniciante");
    if (min >= 8) return t("Avançado");
    return t("Intermediário");
  };

  const getNivelColor = (min: number | undefined, max: number | undefined) => {
    if (!min || !max) return "default";
    if (min <= 3 && max <= 3) return "success";
    if (min >= 8) return "secondary";
    return "primary";
  };

  const isPublica = sala.status === "ABERTA";

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
          {isPublica ? (
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
          <PeopleIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
          <Typography variant="body2">
            {sala.participantes?.length || 0}/{sala.capacidade || 0}{" "}
            {t("jogadores")}
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
