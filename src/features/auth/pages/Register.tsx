import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
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
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../../../components";
import { Toast } from "../../../components/Toast/Toast";
import { useToast } from "../../../hooks/useToast";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { schemaCadastro } from "../schemas/autenticacao";
import { registerStyles } from "../styles/Register.styles";

const Register: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const styles = registerStyles(theme, isMobile);

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
                        label={`${t("auth.register.password")} *`}
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
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="confirmSenha"
                        label={`${t("auth.register.confirmPassword")} *`}
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
                                aria-label="toggle confirm password visibility"
                                onClick={handleToggleConfirmPasswordVisibility}
                                edge="end"
                              >
                                {showConfirmPassword ? (
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
                            {posicao.label}
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
                    sx={styles.submitButton}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t("auth.register.submit")
                    )}
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
