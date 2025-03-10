import { TFunction } from "i18next";
import * as Yup from "yup";

export const schemaLogin = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("auth.validation.invalidEmail"))
      .required(t("auth.validation.required")),
    senha: Yup.string()
      .min(6, t("auth.validation.minPassword"))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)/, t("auth.validation.passwordFormat"))
      .required(t("auth.validation.required")),
  });

export const schemaCadastro = (t: TFunction) =>
  Yup.object().shape({
    nome: Yup.string()
      .min(3, t("auth.validation.minNickname"))
      .required(t("auth.validation.required")),
    email: Yup.string()
      .email(t("auth.validation.invalidEmail"))
      .required(t("auth.validation.required")),
    senha: Yup.string()
      .min(6, t("auth.validation.minPassword"))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)/, t("auth.validation.passwordFormat"))
      .required(t("auth.validation.required")),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref("senha")], t("auth.validation.passwordMatch"))
      .required(t("auth.validation.required")),
    posicao: Yup.string().required(t("auth.validation.required")),
    nivelHabilidade: Yup.number()
      .min(1, t("auth.validation.minSkillLevel"))
      .max(10, t("auth.validation.maxSkillLevel"))
      .required(t("auth.validation.required")),
  });
