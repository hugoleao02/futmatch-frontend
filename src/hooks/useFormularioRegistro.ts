import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ROUTES } from '../constants/routes';
import { useAuthStore } from '../stores';
import type { RegisterRequest } from '../types';
import { useForm } from './useForm';

const validationSchema = Yup.object({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  aceitarTermos: Yup.boolean()
    .oneOf([true], 'Você deve aceitar os termos')
    .required('Aceitar termos é obrigatório'),
});

export const useFormularioRegistro = () => {
  const navegar = useNavigate();
  const { fazerRegistro } = useAuthStore();

  const lidarComEnvio = useCallback(
    async (
      valores: RegisterRequest & { confirmarSenha: string; aceitarTermos: boolean },
    ): Promise<void> => {
      try {
        const { confirmarSenha, aceitarTermos, ...dadosRegistro } = valores;
        await fazerRegistro(dadosRegistro);
        navegar(ROUTES.HOME);
      } catch (erro) {
        console.error('Erro no registro:', erro);
        throw erro;
      }
    },
    [fazerRegistro, navegar],
  );

  const formulario = useForm<RegisterRequest & { confirmarSenha: string; aceitarTermos: boolean }>({
    valoresIniciais: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      aceitarTermos: false,
    },
    esquemaValidacao: validationSchema,
    aoEnviar: lidarComEnvio,
    aoSucesso: () => {
      console.log('Registro realizado com sucesso');
    },
    aoErro: erro => {
      console.error('Erro no registro:', erro);
    },
  });

  const lidarComCliqueLogin = useCallback(() => {
    navegar(ROUTES.LOGIN);
  }, [navegar]);

  return {
    ...formulario,
    lidarComCliqueLogin,
  };
};
