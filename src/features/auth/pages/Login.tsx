import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
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
import { Toast } from "../../../components/Toast/Toast";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { getToken } from "../../../infrastructure/services/TokenService";
import { schemaLogin } from "../../../schemas";
import { loginStyles } from "./Login.styles";

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
  const { toast, showToast, hideToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState<FormularioLogin>({
    email: "",
    senha: "",
  });

  const styles = loginStyles(theme, isMobile);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.message) {
      showToast(state.message, "success");
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
      showToast("Sua sessão expirou. Por favor, faça login novamente.", "info");
    }
  }, [searchParams]);

  const handleSubmit = async (
    values: FormularioLogin,
    { setSubmitting }: FormikHelpers<FormularioLogin>
  ) => {
    try {
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
        showToast(
          error.message || t("auth.errors.invalidCredentials"),
          "error"
        );
      } else {
        showToast(t("auth.errors.invalidCredentials"), "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="sm" sx={styles.container}>
        <Box sx={styles.boxContent}>
          <Paper elevation={24} sx={styles.paper}>
            <Box sx={styles.gradientBar} />

            <Box sx={styles.logoBox}>
              <Logo variant="h3" iconSize={48} />
            </Box>

            <Avatar sx={styles.avatar}>
              <SportsSoccerIcon sx={styles.avatarIcon} />
            </Avatar>

            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={styles.title}
            >
              {t("auth.login.title")}
            </Typography>

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
                    sx={styles.textField}
                  />

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="senha"
                    label={`${t("auth.login.password")} *`}
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
                    sx={styles.textField}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    sx={styles.submitButton}
                  >
                    {isSubmitting
                      ? t("common.loading")
                      : t("auth.login.submit")}
                  </Button>

                  <Box sx={styles.linksContainer}>
                    <Link
                      href="#"
                      variant="body2"
                      sx={styles.forgotPasswordLink}
                    >
                      {t("auth.login.forgotPassword")}
                    </Link>

                    <Link
                      href="/register"
                      variant="body2"
                      sx={styles.registerLink}
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

                  <Box sx={styles.socialButtonsContainer}>
                    <Button
                      variant="outlined"
                      startIcon={
                        <img
                          src="/google-icon.png"
                          alt="Google"
                          style={styles.socialIcon}
                        />
                      }
                      sx={styles.socialButton}
                    >
                      Google
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={
                        <img
                          src="/facebook-icon.png"
                          alt="Facebook"
                          style={styles.socialIcon}
                        />
                      }
                      sx={styles.socialButton}
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
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={hideToast}
      />
    </Box>
  );
};

export default Login;
