import { LoginForm } from '@shared/components/forms/LoginForm';
import { RegisterForm } from '@shared/components/forms/RegisterForm';
import { AuthLayout } from '@shared/components/layouts/AuthLayout';
import { useAuth } from '@shared/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    setIsSubmitting(true);
    try {
      await register(data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      {isLogin ? (
        <LoginForm
          onSubmit={handleLogin}
          onToggleMode={() => setIsLogin(false)}
          isSubmitting={isSubmitting}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          onToggleMode={() => setIsLogin(true)}
          isSubmitting={isSubmitting}
        />
      )}
    </AuthLayout>
  );
}
