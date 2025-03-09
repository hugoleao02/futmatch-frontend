import axios from "axios";
import { API_CONFIG } from "../config/api";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(API_CONFIG.TOKEN.STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(API_CONFIG.TOKEN.STORAGE_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
