import { useMemo } from 'react';
import { FormularioLogin } from '../FormularioLogin';
import { FormularioRegistro } from '../FormularioRegistro';
import type { ConfiguracaoFormulario } from '../types/formularios';
import { useFormularioCadastro, useFormularioLogin } from './index';

export const useConfiguracaoFormularios = (): ConfiguracaoFormulario[] => {
  const { formik: formikLogin, estaEnviando: estaEnviandoLogin } = useFormularioLogin();
  const { formik: formikCadastro, estaEnviando: estaEnviandoCadastro } = useFormularioCadastro();

  return useMemo(
    () => [
      {
        id: 0,
        label: 'Login',
        component: FormularioLogin,
        props: { formik: formikLogin, estaEnviando: estaEnviandoLogin },
      },
      {
        id: 1,
        label: 'Cadastro',
        component: FormularioRegistro,
        props: { formik: formikCadastro, estaEnviando: estaEnviandoCadastro },
      },
    ],
    [formikLogin, estaEnviandoLogin, formikCadastro, estaEnviandoCadastro],
  );
};
