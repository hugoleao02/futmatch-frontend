import axios from 'axios';
import { STORAGE_KEYS } from '../../shared/constants/app';
import { localStorage } from '../../shared/utils/storage/LocalStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.get(STORAGE_KEYS.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Erro de autenticação:', error.response?.status);
      console.log('Token atual:', localStorage.get(STORAGE_KEYS.token));
      localStorage.remove(STORAGE_KEYS.token);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export { api };
