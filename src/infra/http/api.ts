import axios from 'axios';
import type { ApiError } from '../../core/types/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Erro interno do servidor',
      statusCode: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  },
);
