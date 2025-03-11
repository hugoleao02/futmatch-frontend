import { FormikHelpers } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FormularioCadastro } from "../../../@types";
import { PosicaoType } from "../../../@types/enums";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: FormularioCadastro = {
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
    posicao: "ATACANTE" as PosicaoType,
    nivelHabilidade: 5,
  };

  const posicoes = [
    { value: "GOLEIRO", label: "Goleiro" },
    { value: "ZAGUEIRO", label: "Zagueiro" },
    { value: "LATERAL", label: "Lateral" },
    { value: "VOLANTE", label: "Volante" },
    { value: "MEIA", label: "Meia" },
    { value: "ATACANTE", label: "Atacante" },
  ];

  const handleSubmit = async (
    values: FormularioCadastro,
    { setSubmitting }: FormikHelpers<FormularioCadastro>
  ) => {
    if (isSubmitting) {
      console.log("Submissão já em andamento, ignorando...");
      return;
    }

    try {
      setIsSubmitting(true);
      if (!values.posicao) {
        showToast(t("auth.register.errors.positionRequired"), "error");
        return;
      }

      const jogadorDTO = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        posicao: values.posicao as PosicaoType,
        nivelHabilidade: values.nivelHabilidade,
      };

      const response = await register(jogadorDTO);

      if (response && response.success) {
        console.log("Registro bem sucedido, redirecionando para login...");
        showToast(
          response.message || t("auth.register.successMessage"),
          "success"
        );
        setTimeout(() => {
          navigate("/login", {
            state: {
              message: response.message || t("auth.register.successMessage"),
              email: values.email,
            },
          });
        }, 1000);
      } else {
        console.log("Erro no registro:", response);
        showToast(response.message || t("auth.register.error"), "error");
      }
    } catch (error: any) {
      console.error("Erro durante o registro:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("auth.register.error");
      showToast(errorMessage, "error");
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    initialValues,
    posicoes,
    showPassword,
    showConfirmPassword,
    handleSubmit,
    handleTogglePasswordVisibility,
    handleToggleConfirmPasswordVisibility,
  };
};
