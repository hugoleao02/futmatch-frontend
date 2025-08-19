import { useConfiguracaoFormularios } from '../../../shared/hooks';
import type {
  ConfiguracaoFormulario,
  FormularioCadastroProps,
  FormularioLoginProps,
} from '../../../shared/types';
import { FormularioLogin } from '../FormularioLogin';
import { FormularioRegistro } from '../FormularioRegistro';
import { useFormularioCadastro, useFormularioLogin } from './index';

// Hook configurável que permite extensão
export const useFormulariosAutenticacao = (
  formulariosAdicionais: ConfiguracaoFormulario[] = [],
): ConfiguracaoFormulario[] => {
  const { formik: formikLogin, estaEnviando: estaEnviandoLogin } = useFormularioLogin();
  const { formik: formikCadastro, estaEnviando: estaEnviandoCadastro } = useFormularioCadastro();

  const configuracaoBase: ConfiguracaoFormulario[] = [
    {
      id: 0,
      label: 'Login',
      component: FormularioLogin,
      props: { formik: formikLogin, estaEnviando: estaEnviandoLogin } as FormularioLoginProps,
    },
    {
      id: 1,
      label: 'Cadastro',
      component: FormularioRegistro,
      props: {
        formik: formikCadastro,
        estaEnviando: estaEnviandoCadastro,
      } as FormularioCadastroProps,
    },
  ];

  const configuracaoCompleta = [...configuracaoBase, ...formulariosAdicionais];
  return useConfiguracaoFormularios(configuracaoCompleta);
};
