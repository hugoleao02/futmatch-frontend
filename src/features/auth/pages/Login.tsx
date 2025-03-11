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
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../../components/Logo";
import { Toast } from "../../../components/Toast/Toast";
import { schemaLogin } from "../../../schemas";
import { useLoginLogic } from "../hooks/useLoginLogic";
import { loginStyles } from "./Login.styles";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    initialValues,
    showPassword,
    toast,
    handleSubmit,
    handleTogglePasswordVisibility,
    hideToast,
  } = useLoginLogic();

  const styles = loginStyles(theme, isMobile);

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
