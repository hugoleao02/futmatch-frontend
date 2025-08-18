import { useEffect } from 'react';
import * as Yup from 'yup';
import type { LoginRequest, LoginResponse } from '../types';
import { useAuth } from './useAuthNew';
import { useErrorHandler } from './useErrorHandler';
import { useFormOperations } from './useFormOperations';
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

  const formOperations = useFormOperations<LoginRequest, LoginResponse>({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: loginSchema,
    onSubmit: async values => {
      await login(values);
      return {} as LoginResponse; // O login é tratado pelo store
    },
    onError: error => {
      handleError(error, 'Login');
    },
    errorContext: 'Login',
  });

  return {
    formik: formOperations.formik,
  };
};
