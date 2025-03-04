import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  useTheme,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { loginSchema, LoginFormValues } from "../schemas";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Logo from "../components/common/Logo";
import { getToken } from "../services/tokenService";

interface LocationState {
  message?: string;
  email?: string;
  from?: {
    pathname: string;
  };
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
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState<LoginFormValues>({
    email: "",
    senha: "",
  });

  useEffect(() => {
    // Verifica se há mensagem de sucesso do registro
    const state = location.state as LocationState;
    if (state?.message) {
      setSuccess(state.message);
      if (state.email) {
        setInitialValues((prev) => ({ ...prev, email: state.email || "" }));
      }
      // Limpa o estado para não mostrar a mensagem novamente após refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setError("");
      console.log("Iniciando login com valores:", values);
      console.log("Token antes do login:", getToken());

      await login(values);

      console.log("Login realizado com sucesso");
      console.log("Token após login (imediato):", getToken());

      // Verificar o token após um pequeno atraso
      setTimeout(() => {
        console.log("Token após login (com delay):", getToken());

        // Tentar salvar novamente o token diretamente
        const tokenAtual = getToken();
        if (!tokenAtual) {
          console.log("Tentando salvar token diretamente da página de login");
          // Tentar obter o token de alguma forma e salvá-lo
          // Esta é uma solução temporária para diagnóstico
          window.sessionStorage.setItem("tokenBackup", "token_teste_login");
          console.log(
            "Token de backup salvo em sessionStorage:",
            window.sessionStorage.getItem("tokenBackup")
          );
        }
      }, 500);

      // Redireciona para a página anterior ou para a home
      const state = location.state as LocationState;
      const from = state?.from?.pathname || "/";
      console.log("Redirecionando para:", from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Erro durante o login:", error);
      setError(t("auth.errors.invalidCredentials"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      }}
    >
      <Container maxWidth="sm">
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
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "8px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            />

            <Box sx={{ mb: 4, mt: 2, textAlign: "center" }}>
              <Logo variant="h4" iconSize={40} />
            </Box>

            <Avatar
              sx={{
                mb: 2,
                bgcolor: theme.palette.primary.main,
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>

            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              {t("auth.login.title")}
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "100%",
                  mb: 3,
                  borderRadius: 2,
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
                }}
              >
                {success}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema(t)}
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
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 4,
                      mb: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      boxShadow: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      "&:hover": {
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("common.loading")
                      : t("auth.login.submit")}
                  </Button>

                  <Divider sx={{ my: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ px: 1 }}
                    >
                      ou
                    </Typography>
                  </Divider>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {t("auth.login.registerLink").split("?")[0]}?
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/register")}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        fontWeight: "medium",
                      }}
                    >
                      {t("auth.login.registerLink").split("?")[1]}
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
