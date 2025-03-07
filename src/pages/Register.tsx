import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  MenuItem,
  CircularProgress,
  useTheme,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../presentation/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { registerSchema, RegisterFormValues, PosicaoType } from "../schemas";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SportsIcon from "@mui/icons-material/Sports";
import Logo from "../components/common/Logo";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const posicoes: PosicaoType[] = [
    "GOLEIRO",
    "ZAGUEIRO",
    "LATERAL",
    "VOLANTE",
    "MEIA",
    "ATACANTE",
  ];

  const initialValues: RegisterFormValues = {
    apelido: "",
    email: "",
    senha: "",
    confirmSenha: "",
    posicao: undefined,
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setError("");
      const jogadorDTO = {
        apelido: values.apelido,
        email: values.email,
        senha: values.senha,
        posicao: values.posicao,
      };

      console.log("Enviando DTO:", jogadorDTO);
      await register(jogadorDTO);
      navigate("/login", {
        state: {
          message: t("auth.register.successMessage"),
          email: values.email,
        },
      });
    } catch (error: unknown) {
      console.error("Erro no registro:", error);
      setError(t("auth.register.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                bgcolor: theme.palette.secondary.main,
                width: 56,
                height: 56,
              }}
            >
              <PersonAddAltOutlinedIcon fontSize="large" />
            </Avatar>

            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              {t("auth.register.title")}
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

            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema(t)}
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
                        id="apelido"
                        label={t("auth.register.nickname")}
                        name="apelido"
                        autoComplete="nickname"
                        autoFocus
                        error={touched.apelido && Boolean(errors.apelido)}
                        helperText={touched.apelido && errors.apelido}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineOutlinedIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
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
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
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
                          "& input::-ms-reveal, & input::-ms-clear": {
                            display: "none",
                          },
                        }}
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
                          "& input::-ms-reveal, & input::-ms-clear": {
                            display: "none",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        select
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
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>{t("common.select")}</em>
                        </MenuItem>
                        {posicoes.map((posicao) => (
                          <MenuItem key={posicao} value={posicao}>
                            {t(
                              `auth.register.positions.${posicao?.toLowerCase()}`
                            )}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  </Grid>

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
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                      "&:hover": {
                        background: `linear-gradient(90deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress
                          size={24}
                          sx={{ mr: 1, color: "white" }}
                        />
                        {t("common.loading")}
                      </>
                    ) : (
                      t("auth.register.submit")
                    )}
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
                      {t("auth.register.loginLink").split("?")[0]}?
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/login")}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        fontWeight: "medium",
                      }}
                    >
                      {t("auth.register.loginLink").split("?")[1]}
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

export default Register;
