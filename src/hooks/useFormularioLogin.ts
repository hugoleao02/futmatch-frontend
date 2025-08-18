import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ROUTES } from '../constants/routes';
import { useAuthStore } from '../stores';
import type { LoginRequest } from '../types';
import { useForm } from './useForm';

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória'),
});

export const useFormularioLogin = () => {
  const navegar = useNavigate();
  const { fazerLogin } = useAuthStore();

  const lidarComEnvio = useCallback(
    async (valores: LoginRequest): Promise<void> => {
      try {
        await fazerLogin(valores);
        navegar(ROUTES.HOME);
      } catch (erro) {
        console.error('Erro no login:', erro);
        throw erro;
      }
    },
    [fazerLogin, navegar],
  );

  const formulario = useForm<LoginRequest>({
    valoresIniciais: {
      email: '',
      senha: '',
    },
    esquemaValidacao: validationSchema,
    aoEnviar: lidarComEnvio,
    aoSucesso: () => {
      console.log('Login realizado com sucesso');
    },
    aoErro: erro => {
      console.error('Erro no login:', erro);
    },
  });

  const lidarComCliqueRegistro = useCallback(() => {
    navegar(ROUTES.REGISTER);
  }, [navegar]);

  return {
    ...formulario,
    lidarComCliqueRegistro,
  };
};
