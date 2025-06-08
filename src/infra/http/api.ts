import axios from 'axios';
import { STORAGE_KEYS } from '../../shared/constants/app';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    console.log('Token no interceptor:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Headers da requisição:', config.headers);
    } else {
      console.warn('Token não encontrado no localStorage');
    }
    return config;
  },
  error => {
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      console.error('Erro 403: Token inválido ou expirado');
      localStorage.removeItem(STORAGE_KEYS.token);
    }
    return Promise.reject(error);
  },
);
