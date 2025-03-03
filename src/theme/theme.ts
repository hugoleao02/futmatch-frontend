import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32", // Verde principal
      light: "#4CAF50",
      dark: "#1B5E20",
    },
    secondary: {
      main: "#FFA000", // Amarelo para destaque
      light: "#FFB74D",
      dark: "#F57C00",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#1B5E20",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2E7D32",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#2E7D32",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
