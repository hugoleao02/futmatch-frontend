import { Theme } from "@mui/material";

export const registerStyles = (theme: Theme, isMobile: boolean) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    background: `
      radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.8), transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.8), transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.8), transparent 50%),
      radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.8), transparent 50%)
    `,
    backgroundColor: "#0f172a",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(15, 23, 42, 0.3)",
      backdropFilter: "blur(100px)",
    },
  },
  container: {
    position: "relative",
    zIndex: 1,
  },
  boxContent: {
    marginTop: isMobile ? 4 : 8,
    marginBottom: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: { xs: 3, sm: 5 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 3,
    position: "relative",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
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
    height: "6px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  logoBox: {
    mb: 4,
    mt: 2,
    textAlign: "center",
  },
  avatar: {
    mb: 2,
    bgcolor: theme.palette.secondary.main,
    width: 64,
    height: 64,
    boxShadow: "0 4px 12px rgba(255, 193, 7, 0.2)",
  },
  avatarIcon: {
    fontSize: 36,
  },
  title: {
    fontWeight: 700,
    mb: 3,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textAlign: "center",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
      "&.Mui-focused": {
        boxShadow: "0 4px 12px rgba(40, 167, 69, 0.15)",
      },
    },
  },
  submitButton: {
    mt: 3,
    mb: 2,
    py: 1.5,
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: 2,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(255, 193, 7, 0.25)",
    },
  },
  loginLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
  },
});
