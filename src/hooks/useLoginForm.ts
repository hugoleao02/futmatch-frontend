import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import type { LoginRequest } from '../types';
import { useAuth } from './useAuthNew';
import { useErrorHandler } from './useErrorHandler';
import { useNavigation } from './useNavigation';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export const useLoginForm = () => {
  const { login, isAuthenticated } = useAuth();
  const { handleError } = useErrorHandler();
  const { navigateToHome } = useNavigation();

  // Navegar automaticamente quando autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigateToHome();
    }
  }, [isAuthenticated, navigateToHome]);

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values);
        // A navegação será automática via useEffect
      } catch (error) {
        handleError(error, 'Login');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
  };
};
