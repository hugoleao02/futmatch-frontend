import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

export interface ConfiguracaoFormulario<T extends FormikValues> {
  valoresIniciais: T;
  esquemaValidacao: Yup.ObjectSchema<T>;
  aoEnviar: (valores: T) => Promise<void>;
  aoSucesso?: (valores: T) => void;
  aoErro?: (erro: unknown, valores: T) => void;
}

/**
 * Hook especializado para gerenciamento de formulários
 * Responsabilidade única: Gerenciar estado e validação de formulários
 */
export const useForm = <T extends FormikValues>(
  configuracao: ConfiguracaoFormulario<T>,
) => {
  const {
    valoresIniciais,
    esquemaValidacao,
    aoEnviar,
    aoSucesso,
    aoErro,
  } = configuracao;

  const formik = useFormik<T>({
    initialValues: valoresIniciais,
    validationSchema: esquemaValidacao,
    onSubmit: async (valores, { setSubmitting, resetForm }) => {
      try {
        await aoEnviar(valores);
        aoSucesso?.(valores);
        resetForm();
      } catch (erro) {
        aoErro?.(erro, valores);
        throw erro;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const lidarComEnvio = useCallback(async (): Promise<void> => {
    return formik.submitForm();
  }, [formik]);

  const redefinirFormulario = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  const definirValorCampo = useCallback(
    <V>(campo: keyof T, valor: V) => {
      formik.setFieldValue(campo as string, valor);
    },
    [formik],
  );

  const definirErroCampo = useCallback(
    (campo: keyof T, mensagem: string) => {
      formik.setFieldError(campo as string, mensagem);
    },
    [formik],
  );

  return {
    formik,
    lidarComEnvio,
    redefinirFormulario,
    definirValorCampo,
    definirErroCampo,
    ehValido: formik.isValid,
    estaEnviando: formik.isSubmitting,
    valores: formik.values,
    erros: formik.errors,
    camposTocados: formik.touched,
  };
};
