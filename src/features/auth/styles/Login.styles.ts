import { Theme } from "@mui/material";

export const loginStyles = (theme: Theme) => ({
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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  boxContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    width: "100%",
    overflow: "hidden",
  },
  gradientBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  logoBox: {
    marginBottom: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarIcon: {
    fontSize: "2rem",
  },
  title: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    "&:hover": {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    },
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: theme.spacing(2),
  },
  registerLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  linksContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    gap: 1,
    mt: 2,
  },
  forgotPasswordLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  socialButton: {
    borderRadius: 2,
    px: 3,
    py: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    color: "text.primary",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  socialButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
});
