import { useFormularioLogin } from '../hooks/useFormularioLogin';
import { AuthScreen } from './AuthScreen';

// Componente de formulário de login
export const LoginForm = ({ setActiveTab }: { setActiveTab: () => void }) => {
  const { formik } = useFormularioLogin();

  return <AuthScreen />;
};
