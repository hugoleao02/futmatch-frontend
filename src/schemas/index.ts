import * as Yup from "yup";
import { TFunction } from "i18next";

export * from "./authSchemas";
export * from "./types";

export interface LoginFormValues {
  email: string;
  senha: string;
}

export interface RegisterFormValues {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
  posicao: string | undefined;
}

export const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    senha: Yup.string().required(t("validation.required")),
  });

export const registerSchema = (t: TFunction) =>
  Yup.object().shape({
    nome: Yup.string()
      .min(3, t("validation.minLength", { min: 3 }))
      .max(100, t("validation.maxLength", { max: 100 }))
      .required(t("validation.required")),
    email: Yup.string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    senha: Yup.string()
      .min(6, t("validation.minLength", { min: 6 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        t("validation.passwordFormat")
      )
      .required(t("validation.required")),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref("senha")], t("validation.passwordMatch"))
      .required(t("validation.required")),
    posicao: Yup.string().required(t("validation.required")),
  });
