import { useState } from 'react';
import { toast } from 'react-toastify';
import { useContainer } from '../../../../infra/di/useContainer.ts';

interface UseRegisterFormProps {
  setActiveTab: (tab: number) => void;
}

export const useRegisterForm = ({ setActiveTab }: UseRegisterFormProps) => {
  const { useCases } = useContainer();
  const { registerUseCase } = useCases;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      await registerUseCase.execute(name, email, password);
      toast.success('Cadastro realizado com sucesso!');
      // Após o registro bem-sucedido, mudar para a aba de login
      setActiveTab(0);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao fazer cadastro');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = () => {
    setActiveTab(0);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    loading,
    handleSubmit,
    togglePasswordVisibility,
    handleLoginClick,
  };
};
