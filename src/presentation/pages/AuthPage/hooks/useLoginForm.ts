import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../infra/di/AuthProvider';

export const useLoginForm = () => {
  const { useCases } = useAuth();
  const { loginUseCase } = useCases;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUseCase.execute(email, password);
      localStorage.setItem('token', response.token);
      toast.success('Login realizado com sucesso!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    loading,
    handleSubmit,
    togglePasswordVisibility,
  };
};
