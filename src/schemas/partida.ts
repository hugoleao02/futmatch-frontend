import * as Yup from "yup";
import { TFunction } from "i18next";

export const schemaPartida = (t: TFunction) =>
  Yup.object().shape({
    titulo: Yup.string()
      .min(3, t("match.validation.minTitle"))
      .required(t("match.validation.required")),
    local: Yup.string().required(t("match.validation.required")),
    dataHora: Yup.date().required(t("match.validation.required")),
    maxJogadores: Yup.number()
      .min(2, t("match.validation.minPlayers"))
      .max(22, t("match.validation.maxPlayers"))
      .required(t("match.validation.required")),
    nivelHabilidade: Yup.string().required(t("match.validation.required")),
  });
