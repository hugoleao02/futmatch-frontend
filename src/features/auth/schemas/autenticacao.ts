import { TFunction } from "i18next";
import * as Yup from "yup";

export const schemaLogin = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("validation.email.invalid"))
      .required(t("validation.email.required")),
    senha: Yup.string()
      .min(6, t("validation.password.min"))
      .required(t("validation.password.required")),
  });

export const schemaCadastro = (t: TFunction) =>
  Yup.object().shape({
    nome: Yup.string()
      .min(3, t("validation.nickname.min"))
      .required(t("validation.nickname.required")),
    email: Yup.string()
      .email(t("validation.email.invalid"))
      .required(t("validation.email.required")),
    senha: Yup.string()
      .min(6, t("validation.password.min"))
      .required(t("validation.password.required")),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref("senha")], t("validation.confirmPassword.match"))
      .required(t("validation.confirmPassword.required")),
    posicao: Yup.string().required(t("validation.position.required")),
    nivelHabilidade: Yup.number()
      .min(1, t("validation.skillLevel.min"))
      .max(10, t("validation.skillLevel.max"))
      .required(t("validation.skillLevel.required")),
  });
