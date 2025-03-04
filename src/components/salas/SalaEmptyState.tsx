import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

interface SalaEmptyStateProps {
  onRefresh: () => void;
}

const SalaEmptyState: React.FC<SalaEmptyStateProps> = ({ onRefresh }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 4, textAlign: "center" }}>
      <SportsSoccerIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {t("Nenhuma sala encontrada")}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {t("Não encontramos salas com os critérios especificados.")}
      </Typography>
      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={onRefresh}
      >
        {t("Limpar filtros e tentar novamente")}
      </Button>
    </Paper>
  );
};

export default SalaEmptyState;
