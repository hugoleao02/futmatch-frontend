import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SaveButtonProps {
  loading: boolean;
  onClick: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ loading, onClick }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<SaveIcon />}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        t("settings.saveButton")
      )}
    </Button>
  );
};
