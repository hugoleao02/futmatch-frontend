import axios from 'axios';
import { STORAGE_KEYS } from '../../../shared/constants';

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    config => {
      const token = window.localStorage.getItem(STORAGE_KEYS.token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
  );

  return instance;
};
