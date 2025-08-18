import { useFormularioRegistro } from '../hooks/useFormularioRegistro';
import { AuthScreen } from './AuthScreen';

// Componente de formulário de registro
export const RegisterForm = ({ setActiveTab }: { setActiveTab: () => void }) => {
  const { formik } = useFormularioRegistro();

  return <AuthScreen />;
};
