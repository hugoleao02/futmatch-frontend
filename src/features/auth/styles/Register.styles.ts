import { Theme } from "@mui/material";

export const registerStyles = (theme: Theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(135deg, 
          rgba(40, 167, 69, 0.2) 0%, 
          rgba(0, 0, 0, 0.9) 100%)`
        : `linear-gradient(135deg, 
          rgba(33, 150, 243, 0.1) 0%, 
          rgba(255, 255, 255, 0.9) 100%)`,
    backgroundColor: theme.palette.mode === "dark" ? "#0f172a" : "#ffffff",
  },
  container: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
    padding: theme.spacing(3),
  },
  boxContent: {
    width: "100%",
  },
  paper: {
    padding: { xs: 3, sm: 4 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 2,
    position: "relative",
    overflow: "hidden",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(26, 32, 39, 0.8)"
        : "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 32px rgba(0, 0, 0, 0.3)"
        : "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  gradientBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
        : `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  },
  logoBox: {
    mb: 3,
    mt: 1,
    textAlign: "center",
  },
  avatar: {
    mb: 2,
    width: 56,
    height: 56,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 12px rgba(40, 167, 69, 0.3)"
        : "0 4px 12px rgba(33, 150, 243, 0.2)",
  },
  avatarIcon: {
    fontSize: 32,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.contrastText,
  },
  title: {
    fontWeight: 700,
    mb: 4,
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
        : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textAlign: "center",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.02)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.04)",
      },
      "&.Mui-focused": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.06)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 12px rgba(40, 167, 69, 0.15)"
            : "0 4px 12px rgba(33, 150, 243, 0.15)",
      },
    },
    "& .MuiSelect-select": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
  submitButton: {
    mt: 3,
    mb: 2,
    py: 1.5,
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 1,
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
        : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 6px 16px rgba(40, 167, 69, 0.25)"
          : "0 6px 16px rgba(33, 150, 243, 0.25)",
    },
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
  },
  loginLink: {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.875rem",
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
});
