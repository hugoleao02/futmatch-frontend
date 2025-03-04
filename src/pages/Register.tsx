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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { registerSchema, RegisterFormValues, PosicaoType } from "../schemas";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();
  const [error, setError] = useState("");

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

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            {t("auth.register.title")}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
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
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="apelido"
                  label={t("auth.register.nickname")}
                  name="apelido"
                  autoComplete="nickname"
                  autoFocus
                  error={touched.apelido && Boolean(errors.apelido)}
                  helperText={touched.apelido && errors.apelido}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t("auth.register.email")}
                  name="email"
                  autoComplete="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="senha"
                  label={t("auth.register.password")}
                  type="password"
                  id="senha"
                  autoComplete="new-password"
                  error={touched.senha && Boolean(errors.senha)}
                  helperText={touched.senha && errors.senha}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="confirmSenha"
                  label={t("auth.register.confirmPassword")}
                  type="password"
                  id="confirmSenha"
                  autoComplete="new-password"
                  error={touched.confirmSenha && Boolean(errors.confirmSenha)}
                  helperText={touched.confirmSenha && errors.confirmSenha}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  select
                  name="posicao"
                  label={t("auth.register.position")}
                  error={touched.posicao && Boolean(errors.posicao)}
                  helperText={touched.posicao && errors.posicao}
                >
                  <MenuItem value="">
                    <em>{t("common.select")}</em>
                  </MenuItem>
                  {posicoes.map((posicao) => (
                    <MenuItem key={posicao} value={posicao}>
                      {t(`auth.register.positions.${posicao?.toLowerCase()}`)}
                    </MenuItem>
                  ))}
                </Field>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      {t("common.loading")}
                    </>
                  ) : (
                    t("auth.register.submit")
                  )}
                </Button>
                <Box sx={{ textAlign: "center" }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/login")}
                  >
                    {t("auth.register.loginLink")}
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
