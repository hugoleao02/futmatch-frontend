import { useFormik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Tipo de valores para login
type LoginValues = { email: string; senha: string };

// Esquema de validação para login
const esquemaLogin = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória'),
});

export const useFormularioLogin = () => {
  const lidarComEnvio = async (
    valores: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>,
  ) => {
    try {
      console.log('Login:', valores);
      // await fazerLogin({ email: valores.email, senha: valores.senha });
      // navegar(ROUTES.HOME);
    } catch (erro) {
      console.error('Erro no login:', erro);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<LoginValues>({
    initialValues: { email: '', senha: '' },
    validationSchema: esquemaLogin,
    onSubmit: lidarComEnvio,
  });

  return {
    formik,
    estaEnviando: formik.isSubmitting,
  };
};
