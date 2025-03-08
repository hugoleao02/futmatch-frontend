import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Definindo as cores do tema de futebol
const colors = {
  grass: {
    light: "#4CAF50",
    main: "#28A745",
    dark: "#1B7E31",
  },
  gold: {
    light: "#FFD54F",
    main: "#FFC107",
    dark: "#FFA000",
  },
  neutral: {
    white: "#FFFFFF",
    lightGray: "#F8F9FA",
    gray: "#E9ECEF",
    darkGray: "#343A40",
  },
};

// Criando tema base
const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: colors.grass.main,
      light: colors.grass.light,
      dark: colors.grass.dark,
      contrastText: colors.neutral.white,
    },
    secondary: {
      main: colors.gold.main,
      light: colors.gold.light,
      dark: colors.gold.dark,
      contrastText: colors.neutral.darkGray,
    },
    background: {
      default: colors.neutral.lightGray,
      paper: colors.neutral.white,
    },
    text: {
      primary: colors.neutral.darkGray,
      secondary: "#546E7A",
    },
    success: {
      main: colors.grass.main,
      light: colors.grass.light,
      dark: colors.grass.dark,
    },
    error: {
      main: "#F44336",
      light: "#E57373",
      dark: "#D32F2F",
    },
    warning: {
      main: colors.gold.main,
      light: colors.gold.light,
      dark: colors.gold.dark,
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: ["'Montserrat'", "'Roboto'", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      letterSpacing: "0em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "0em",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontWeight: 400,
      letterSpacing: "0.00938em",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      letterSpacing: "0.01071em",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.02857em",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.03)",
    "0px 3px 1px -2px rgba(0,0,0,0.05),0px 2px 2px 0px rgba(0,0,0,0.03),0px 1px 5px 0px rgba(0,0,0,0.03)",
    "0px 3px 3px -2px rgba(0,0,0,0.05),0px 3px 4px 0px rgba(0,0,0,0.03),0px 1px 8px 0px rgba(0,0,0,0.03)",
    "0px 2px 4px -1px rgba(0,0,0,0.05),0px 4px 5px 0px rgba(0,0,0,0.03),0px 1px 10px 0px rgba(0,0,0,0.03)",
    "0px 3px 5px -1px rgba(0,0,0,0.05),0px 5px 8px 0px rgba(0,0,0,0.03),0px 1px 14px 0px rgba(0,0,0,0.03)",
    "0px 3px 5px -1px rgba(0,0,0,0.05),0px 6px 10px 0px rgba(0,0,0,0.03),0px 1px 18px 0px rgba(0,0,0,0.03)",
    "0px 4px 5px -2px rgba(0,0,0,0.05),0px 7px 10px 1px rgba(0,0,0,0.03),0px 2px 16px 1px rgba(0,0,0,0.03)",
    "0px 5px 5px -3px rgba(0,0,0,0.05),0px 8px 10px 1px rgba(0,0,0,0.03),0px 3px 14px 2px rgba(0,0,0,0.03)",
    "0px 5px 6px -3px rgba(0,0,0,0.05),0px 9px 12px 1px rgba(0,0,0,0.03),0px 3px 16px 2px rgba(0,0,0,0.03)",
    "0px 6px 6px -3px rgba(0,0,0,0.05),0px 10px 14px 1px rgba(0,0,0,0.03),0px 4px 18px 3px rgba(0,0,0,0.03)",
    "0px 6px 7px -4px rgba(0,0,0,0.05),0px 11px 15px 1px rgba(0,0,0,0.03),0px 4px 20px 3px rgba(0,0,0,0.03)",
    "0px 7px 8px -4px rgba(0,0,0,0.05),0px 12px 17px 2px rgba(0,0,0,0.03),0px 5px 22px 4px rgba(0,0,0,0.03)",
    "0px 7px 8px -4px rgba(0,0,0,0.05),0px 13px 19px 2px rgba(0,0,0,0.03),0px 5px 24px 4px rgba(0,0,0,0.03)",
    "0px 7px 9px -4px rgba(0,0,0,0.05),0px 14px 21px 2px rgba(0,0,0,0.03),0px 5px 26px 4px rgba(0,0,0,0.03)",
    "0px 8px 9px -5px rgba(0,0,0,0.05),0px 15px 22px 2px rgba(0,0,0,0.03),0px 6px 28px 5px rgba(0,0,0,0.03)",
    "0px 8px 10px -5px rgba(0,0,0,0.05),0px 16px 24px 2px rgba(0,0,0,0.03),0px 6px 30px 5px rgba(0,0,0,0.03)",
    "0px 8px 11px -5px rgba(0,0,0,0.05),0px 17px 26px 2px rgba(0,0,0,0.03),0px 6px 32px 5px rgba(0,0,0,0.03)",
    "0px 9px 11px -5px rgba(0,0,0,0.05),0px 18px 28px 2px rgba(0,0,0,0.03),0px 7px 34px 6px rgba(0,0,0,0.03)",
    "0px 9px 12px -6px rgba(0,0,0,0.05),0px 19px 29px 2px rgba(0,0,0,0.03),0px 7px 36px 6px rgba(0,0,0,0.03)",
    "0px 10px 13px -6px rgba(0,0,0,0.05),0px 20px 31px 3px rgba(0,0,0,0.03),0px 8px 38px 7px rgba(0,0,0,0.03)",
    "0px 10px 13px -6px rgba(0,0,0,0.05),0px 21px 33px 3px rgba(0,0,0,0.03),0px 8px 40px 7px rgba(0,0,0,0.03)",
    "0px 10px 14px -6px rgba(0,0,0,0.05),0px 22px 35px 3px rgba(0,0,0,0.03),0px 8px 42px 7px rgba(0,0,0,0.03)",
    "0px 11px 14px -7px rgba(0,0,0,0.05),0px 23px 36px 3px rgba(0,0,0,0.03),0px 9px 44px 8px rgba(0,0,0,0.03)",
    "0px 11px 15px -7px rgba(0,0,0,0.05),0px 24px 38px 3px rgba(0,0,0,0.03),0px 9px 46px 8px rgba(0,0,0,0.03)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          padding: "10px 24px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          backgroundImage: `linear-gradient(90deg, ${colors.grass.dark} 0%, ${colors.grass.main} 100%)`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          backgroundColor: colors.neutral.white,
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          padding: "4px 2px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0",
        },
      },
    },
  },
});

// Aplicando fontes responsivas
export const theme = responsiveFontSizes(baseTheme, { factor: 0.5 });
