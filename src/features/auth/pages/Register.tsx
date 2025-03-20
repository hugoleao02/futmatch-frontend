import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../../../components";
import { Toast } from "../../../components/Toast/Toast";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { useToast } from "../../../hooks/useToast";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { schemaCadastro } from "../schemas/autenticacao";
import { registerStyles } from "../styles/Register.styles";

const Register: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { toast, hideToast } = useToast();
  const {
    initialValues,
    posicoes,
    showPassword,
    showConfirmPassword,
    handleSubmit,
    handleTogglePasswordVisibility,
    handleToggleConfirmPasswordVisibility,
  } = useRegisterForm();

  const { mode, setMode } = useThemeContext();
  const styles = registerStyles(theme);

  return (
    <Box sx={styles.root}>
      <IconButton
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>

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

            <Typography component="h1" variant="h4" sx={styles.title}>
              {t("auth.register.title")}
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={schemaCadastro(t)}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form style={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="nome"
                        label={t("auth.register.nickname")}
                        name="nome"
                        autoComplete="nickname"
                        autoFocus
                        error={touched.nome && Boolean(errors.nome)}
                        helperText={touched.nome && errors.nome}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineOutlinedIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={styles.textField}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="email"
                        label={t("auth.register.email")}
                        name="email"
                        autoComplete="email"
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
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="senha"
                        label={t("auth.register.password")}
                        type={showPassword ? "text" : "password"}
                        id="senha"
                        autoComplete="new-password"
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
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={styles.textField}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="confirmSenha"
                        label={t("auth.register.confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmSenha"
                        autoComplete="new-password"
                        error={
                          touched.confirmSenha && Boolean(errors.confirmSenha)
                        }
                        helperText={touched.confirmSenha && errors.confirmSenha}
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
                                onClick={handleToggleConfirmPasswordVisibility}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={styles.textField}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        select
                        required
                        fullWidth
                        name="posicao"
                        label={t("auth.register.position")}
                        error={touched.posicao && Boolean(errors.posicao)}
                        helperText={touched.posicao && errors.posicao}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SportsIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={styles.textField}
                      >
                        {posicoes.map((posicao) => (
                          <MenuItem key={posicao.value} value={posicao.value}>
                            {t(
                              `auth.register.positions.${posicao.value.toLowerCase()}`
                            )}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        type="number"
                        name="nivelHabilidade"
                        label={t("auth.register.skillLevel")}
                        error={
                          touched.nivelHabilidade &&
                          Boolean(errors.nivelHabilidade)
                        }
                        helperText={
                          touched.nivelHabilidade && errors.nivelHabilidade
                        }
                        InputProps={{
                          inputProps: { min: 1, max: 10 },
                          startAdornment: (
                            <InputAdornment position="start">
                              <SportsSoccerIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={styles.textField}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    sx={styles.submitButton}
                  >
                    {isSubmitting
                      ? t("common.loading")
                      : t("auth.register.submit")}
                  </Button>

                  <Box sx={styles.linkContainer}>
                    <Link href="/login" variant="body2" sx={styles.loginLink}>
                      {t("auth.register.hasAccount")}
                    </Link>
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

export default Register;
