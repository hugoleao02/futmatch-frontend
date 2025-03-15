import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FormularioLogin, LoginDTO } from "../../../@types";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { getToken } from "../../../infrastructure/services/TokenService";

interface LocationState {
  from?: { pathname: string };
  message?: string;
  email?: string;
}

export const useLoginLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useTranslation();
  const { toast, showToast, hideToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState<FormularioLogin>({
    email: "",
    senha: "",
  });

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
        showToast("Erro ao realizar login: token não encontrado", "error");
        return;
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

  return {
    initialValues,
    showPassword,
    toast,
    handleSubmit,
    handleTogglePasswordVisibility,
    hideToast,
  };
};
