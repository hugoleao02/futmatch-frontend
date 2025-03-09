import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface ToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity = "info",
  onClose,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          boxShadow: (theme) => theme.shadows[3],
          borderRadius: 2,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
