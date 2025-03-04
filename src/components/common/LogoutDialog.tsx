import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  username?: string;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onClose,
  onConfirm,
  username,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          px: 1,
        },
      }}
    >
      <Box sx={{ textAlign: "center", pt: 3 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: theme.palette.error.light,
            width: 60,
            height: 60,
            mb: 2,
          }}
        >
          <LogoutIcon
            fontSize="large"
            sx={{ color: theme.palette.error.main }}
          />
        </Avatar>
      </Box>

      <DialogTitle id="logout-dialog-title" sx={{ textAlign: "center", pb: 0 }}>
        {t("auth.logout.title")}
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <DialogContentText
          id="logout-dialog-description"
          sx={{ textAlign: "center" }}
        >
          {username
            ? t("auth.logout.confirmWithName", { name: username })
            : t("auth.logout.confirm")}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3, px: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            minWidth: 100,
          }}
        >
          {t("common.cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            minWidth: 100,
          }}
        >
          {t("auth.logout.confirmButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
