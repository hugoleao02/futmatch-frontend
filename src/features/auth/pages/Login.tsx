import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FormularioLogin, LoginDTO } from "../../../@types";
import Logo from "../../../components/Logo";
import { useAuth } from "../../../hooks/useAuth";
import { getToken } from "../../../infrastructure/services/TokenService";
import { schemaLogin } from "../../../schemas";

interface LocationState {
  from?: { pathname: string };
  message?: string;
  email?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword] = useState(false);
  const [initialValues, setInitialValues] = useState<FormularioLogin>({
    email: "",
    senha: "",
  });

  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<{
    type: "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.message) {
      setSuccess(state.message);
      if (state.email) {
        setInitialValues((prev: FormularioLogin) => ({
          ...prev,
          email: state.email || "",
        }));
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      setMessage({
        type: "info",
        text: "Sua sessão expirou. Por favor, faça login novamente.",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (
    values: FormularioLogin,
    { setSubmitting }: FormikHelpers<FormularioLogin>
  ) => {
    try {
      setError("");

      const loginDTO: LoginDTO = {
        email: values.email,
        senha: values.senha,
      };

      await login(loginDTO);

      const tokenAtual = getToken();

      if (!tokenAtual) {
        window.sessionStorage.setItem("tokenBackup", "token_teste_login");
      }

      const state = location.state as LocationState;
      const from = state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || t("auth.errors.invalidCredentials"));
      } else {
        setError(t("auth.errors.invalidCredentials"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `url('/soccer-field-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(40, 167, 69, 0.95), rgba(27, 126, 49, 0.9))`,
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            marginTop: isMobile ? 4 : 8,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={24}
            sx={{
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
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            />

            <Box sx={{ mb: 4, mt: 2, textAlign: "center" }}>
              <Logo variant="h3" iconSize={48} />
            </Box>

            <Avatar
              sx={{
                mb: 2,
                bgcolor: theme.palette.primary.main,
                width: 64,
                height: 64,
                boxShadow: "0 4px 12px rgba(40, 167, 69, 0.2)",
              }}
            >
              <SportsSoccerIcon sx={{ fontSize: 36 }} />
            </Avatar>

            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textAlign: "center",
              }}
            >
              {t("auth.login.title")}
            </Typography>

            {message && (
              <Alert severity={message.type} sx={{ mb: 2 }}>
                {message.text}
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "100%",
                  mb: 3,
                  borderRadius: 2,
                  animation: "slideIn 0.3s ease-out",
                  "@keyframes slideIn": {
                    from: {
                      opacity: 0,
                      transform: "translateY(-10px)",
                    },
                    to: {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{
                  width: "100%",
                  mb: 3,
                  borderRadius: 2,
                  animation: "slideIn 0.3s ease-out",
                }}
              >
                {success}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={schemaLogin(t)}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, touched, errors }) => (
                <Form style={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t("auth.login.email")}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                    }}
                  />

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="senha"
                    label={t("auth.login.password")}
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    autoComplete="current-password"
                    error={touched.senha && Boolean(errors.senha)}
                    helperText={touched.senha && errors.senha}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(40, 167, 69, 0.25)",
                      },
                    }}
                  >
                    {isSubmitting
                      ? t("common.loading")
                      : t("auth.login.submit")}
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Link
                      href="#"
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: theme.palette.primary.dark,
                        },
                      }}
                    >
                      {t("auth.login.forgotPassword")}
                    </Link>

                    <Link
                      href="/register"
                      variant="body2"
                      sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: theme.palette.secondary.dark,
                        },
                      }}
                    >
                      {t("auth.login.noAccount")}
                    </Link>
                  </Box>

                  <Divider sx={{ my: 4 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ px: 2 }}
                    >
                      {t("auth.login.or")}
                    </Typography>
                  </Divider>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={
                        <img
                          src="/google-icon.png"
                          alt="Google"
                          style={{ width: 20, height: 20 }}
                        />
                      }
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        borderColor: "rgba(0, 0, 0, 0.12)",
                        color: "text.primary",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      Google
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={
                        <img
                          src="/facebook-icon.png"
                          alt="Facebook"
                          style={{ width: 20, height: 20 }}
                        />
                      }
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        borderColor: "rgba(0, 0, 0, 0.12)",
                        color: "text.primary",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      Facebook
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
