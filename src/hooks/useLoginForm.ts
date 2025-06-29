import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import type { LoginRequest } from '../types';
import { useAuth } from './useAuth';

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setLoading(true);
      await login(data);
      navigate(ROUTES.HOME);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    loading,
    onSubmit,
  };
};
