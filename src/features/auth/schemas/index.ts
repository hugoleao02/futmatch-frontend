import * as Yup from "yup";
import { TFunction } from "i18next";

export interface LoginFormValues {
  email: string;
  senha: string;
}

export interface RegisterFormValues {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
  posicao?: string;
}

export const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("auth.validation.invalidEmail"))
      .required(t("auth.validation.required")),
    senha: Yup.string()
      .min(6, t("auth.validation.minPassword"))
      .required(t("auth.validation.required")),
  });

export const registerSchema = (t: TFunction) =>
  Yup.object().shape({
    nome: Yup.string()
      .min(3, t("auth.validation.minNickname"))
      .required(t("auth.validation.required")),
    email: Yup.string()
      .email(t("auth.validation.invalidEmail"))
      .required(t("auth.validation.required")),
    senha: Yup.string()
      .min(6, t("auth.validation.minPassword"))
      .required(t("auth.validation.required")),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref("senha")], t("auth.validation.passwordMatch"))
      .required(t("auth.validation.required")),
    posicao: Yup.string().required(t("auth.validation.required")),
  });
