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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { loginSchema, LoginFormValues } from "../schemas";

interface LocationState {
  message?: string;
  email?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      await login(values);
      navigate("/");
    } catch {
      setError(t("auth.errors.invalidCredentials"));
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
            {t("auth.login.title")}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
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
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="senha"
                  label={t("auth.login.password")}
                  type="password"
                  id="senha"
                  autoComplete="current-password"
                  error={touched.senha && Boolean(errors.senha)}
                  helperText={touched.senha && errors.senha}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("common.loading") : t("auth.login.submit")}
                </Button>
                <Box sx={{ textAlign: "center" }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/register")}
                  >
                    {t("auth.login.registerLink")}
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

export default Login;
