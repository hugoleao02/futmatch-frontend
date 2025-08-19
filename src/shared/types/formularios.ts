import type { FormikProps } from 'formik';
import type { ComponentType } from 'react';

// Interface base para todos os formulários
export interface FormularioBaseProps {
  formik: FormikProps<any>;
  estaEnviando: boolean;
}

// Interface específica para formulários de login
export interface FormularioLoginProps extends FormularioBaseProps {
  formik: FormikProps<LoginValues>;
}

// Interface específica para formulários de cadastro
export interface FormularioCadastroProps extends FormularioBaseProps {
  formik: FormikProps<CadastroValues>;
}

// Configuração de um formulário com props específicas
export interface ConfiguracaoFormulario<T = FormularioBaseProps> {
  id: number;
  label: string;
  component: ComponentType<T>;
  props: T;
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
  aceitarTermos: boolean;
};
