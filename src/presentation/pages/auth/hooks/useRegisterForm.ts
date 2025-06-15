import { useState } from 'react';
import { toast } from 'react-toastify';
import { useContainer } from '../../../../infra/di/useContainer.ts';

interface UseRegisterFormProps {
  setActiveTab: (tab: number) => void;
}

export const useRegisterForm = ({ setActiveTab }: UseRegisterFormProps) => {
  const { useCases } = useContainer();
  const { registerUseCase } = useCases;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      await registerUseCase.execute({ nome, email, senha });
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
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    showPassword,
    loading,
    handleSubmit,
    togglePasswordVisibility,
    handleLoginClick,
  };
};
