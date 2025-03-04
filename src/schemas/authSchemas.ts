import * as Yup from "yup";
import { TFunction } from "i18next";

/**
 * Esquema de validação para o formulário de login
 * @param t Função de tradução do i18next
 * @returns Esquema de validação Yup para o formulário de login
 */
export const loginSchema = (t: TFunction) =>
  Yup.object({
    email: Yup.string()
      .email(t("auth.errors.invalidEmail"))
      .required(t("auth.errors.requiredField")),
    senha: Yup.string()
      .required(t("auth.errors.requiredField"))
      .min(6, t("auth.errors.passwordTooShort")),
  });

/**
 * Esquema de validação para o formulário de registro
 * @param t Função de tradução do i18next
 * @returns Esquema de validação Yup para o formulário de registro
 */
export const registerSchema = (t: TFunction) =>
  Yup.object({
    apelido: Yup.string()
      .required(t("auth.errors.requiredField"))
      .min(3, t("auth.register.errors.nicknameTooShort")),
    email: Yup.string()
      .email(t("auth.errors.invalidEmail"))
      .required(t("auth.errors.requiredField")),
    senha: Yup.string()
      .required(t("auth.errors.requiredField"))
      .min(6, t("auth.errors.passwordTooShort")),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref("senha")], t("auth.errors.passwordsDontMatch"))
      .required(t("auth.errors.requiredField")),
    posicao: Yup.string().nullable(),
  });
