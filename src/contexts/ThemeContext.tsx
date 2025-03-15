import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { baseTheme } from "../theme/theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("tema");
    return (savedMode as ThemeMode) || "system";
  });

  useEffect(() => {
    localStorage.setItem("tema", mode);
  }, [mode]);

  const theme = useMemo(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const effectiveMode =
      mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode: effectiveMode,
        background: {
          default:
            effectiveMode === "dark"
              ? "#121212"
              : baseTheme.palette.background.default,
          paper:
            effectiveMode === "dark"
              ? "#1e1e1e"
              : baseTheme.palette.background.paper,
        },
        text: {
          primary:
            effectiveMode === "dark"
              ? "#ffffff"
              : baseTheme.palette.text.primary,
          secondary:
            effectiveMode === "dark"
              ? "#b0b0b0"
              : baseTheme.palette.text.secondary,
        },
      },
    });
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
