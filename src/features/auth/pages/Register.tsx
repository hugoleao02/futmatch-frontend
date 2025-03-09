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
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { schemaCadastro } from "../../../schemas";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SportsIcon from "@mui/icons-material/Sports";
import { Logo } from "../../../components";
import { FormularioCadastro } from "../../../@types";
import { PosicaoType } from "../../../@types/enums";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const posicoes = [
    { value: "GOLEIRO", label: "Goleiro" },
    { value: "ZAGUEIRO", label: "Zagueiro" },
    { value: "LATERAL", label: "Lateral" },
    { value: "VOLANTE", label: "Volante" },
    { value: "MEIA", label: "Meia" },
    { value: "ATACANTE", label: "Atacante" },
  ];

  const initialValues: FormularioCadastro = {
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
    posicao: "ATACANTE" as PosicaoType,
  };

  const handleSubmit = async (
    values: FormularioCadastro,
    { setSubmitting }: FormikHelpers<FormularioCadastro>
  ) => {
    try {
      setError("");
      if (!values.posicao) {
        throw new Error(t("auth.register.errors.positionRequired"));
      }

      const jogadorDTO = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        posicao: values.posicao as PosicaoType,
      };

      await register(jogadorDTO);
      navigate("/login", {
        state: {
          message: t("auth.register.successMessage"),
          email: values.email,
        },
      });
    } catch (error: unknown) {
      console.error("Erro no registro:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(t("auth.register.error"));
      }
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
                bgcolor: theme.palette.secondary.main,
                width: 64,
                height: 64,
                boxShadow: "0 4px 12px rgba(255, 193, 7, 0.2)",
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
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textAlign: "center",
              }}
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
                              ></IconButton>
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
                      >
                        {posicoes.map((posicao) => (
                          <MenuItem key={posicao.value} value={posicao.value}>
                            {posicao.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  </Grid>

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
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(255, 193, 7, 0.25)",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t("auth.register.submit")
                    )}
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: theme.palette.primary.dark,
                        },
                      }}
                    >
                      {t("auth.register.hasAccount")}
                    </Link>
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
