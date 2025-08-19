import { useFormik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Tipo de valores para cadastro
type CadastroValues = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  aceitarTermos: boolean;
};

// Esquema de validação para cadastro
const esquemaCadastro = Yup.object({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
  aceitarTermos: Yup.boolean()
    .oneOf([true], 'Você deve aceitar os termos')
    .required('Você deve aceitar os termos'),
});

export const useFormularioCadastro = () => {
  const lidarComEnvio = async (
    valores: CadastroValues,
    { setSubmitting }: FormikHelpers<CadastroValues>,
  ) => {
    try {
      console.log('Cadastro:', valores);
      // await fazerRegistro(valores);
      // navegar(ROUTES.HOME);
    } catch (erro) {
      console.error('Erro no cadastro:', erro);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<CadastroValues>({
    initialValues: { nome: '', email: '', senha: '', confirmarSenha: '', aceitarTermos: false },
    validationSchema: esquemaCadastro,
    onSubmit: lidarComEnvio,
  });

  return {
    formik,
    estaEnviando: formik.isSubmitting,
  };
};
