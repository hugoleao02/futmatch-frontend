import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import type { LoginRequest } from '../types';
import { useAuth } from './useAuth';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export const useLoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values);
        // Aguardar um pouco para garantir que o estado foi atualizado
        setTimeout(() => {
          navigate('/home');
        }, 100);
      } catch (error) {
        // Erro já tratado no hook useAuth
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
  };
};
