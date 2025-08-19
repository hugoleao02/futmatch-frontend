import type { FormikProps } from 'formik';
import type { ComponentType } from 'react';

// Interface base para todos os formulários
export interface FormularioBaseProps {
  formik: FormikProps<any>;
  estaEnviando: boolean;
}

// Configuração de um formulário
export interface ConfiguracaoFormulario {
  id: number;
  label: string;
  component: ComponentType<FormularioBaseProps>;
  props: FormularioBaseProps;
}

// Tipo para valores de login
export type LoginValues = {
  email: string;
  senha: string;
};

// Tipo para valores de cadastro
export type CadastroValues = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};
