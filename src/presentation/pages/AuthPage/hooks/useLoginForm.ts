import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContainer } from '../../../../infra/di/useContainer';
import { useAuth } from '../../../../shared/hooks';

export const useLoginForm = () => {
  const { useCases } = useContainer();
  const { login } = useAuth();
  const navigate = useNavigate();
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
      login(response.token);
      toast.success('Login realizado com sucesso!');
      navigate('/home');
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
