import { useEffect } from 'react';
import * as Yup from 'yup';
import type { RegisterRequest, RegisterResponse } from '../types';
import { useAuth } from './useAuthNew';
import { useErrorHandler } from './useErrorHandler';
import { useNavigation } from './useNavigation';
import { useFormOperations } from './useFormOperations';

const registerSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
  aceitarTermos: Yup.boolean()
    .oneOf([true], 'Você deve aceitar os termos de serviço')
    .required('Você deve aceitar os termos de serviço'),
});

export const useRegisterForm = () => {
  const { register, isAuthenticated } = useAuth();
  const { handleError } = useErrorHandler();
  const { navigateToHome } = useNavigation();

  // Navegar automaticamente quando autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigateToHome();
    }
  }, [isAuthenticated, navigateToHome]);

  const formOperations = useFormOperations<RegisterRequest & { confirmarSenha: string; aceitarTermos: boolean }, RegisterResponse>({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      aceitarTermos: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { confirmarSenha, aceitarTermos, ...registerData } = values;
      await register(registerData);
      return {} as RegisterResponse; // O registro é tratado pelo store
    },
    onError: (error) => {
      handleError(error, 'Registro');
    },
    errorContext: 'Registro',
  });

  return {
    formik: formOperations.formik,
  };
};
