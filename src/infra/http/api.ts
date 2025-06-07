import axios from 'axios';
import { STORAGE_KEYS } from '../../shared/constants/app';
import type { ApiError } from '../../shared/types/common';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const apiError: ApiError = {
      code: error.response?.data?.code || 'INTERNAL_ERROR',
      message: error.response?.data?.message || 'Erro interno do servidor',
      details: error.response?.data?.details,
    };
    return Promise.reject(apiError);
  },
);
