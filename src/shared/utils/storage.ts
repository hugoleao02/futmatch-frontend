import { toast, type ToastOptions } from 'react-toastify';

// LocalStorage wrapper with error handling
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      toast.error('Storage set error:', error as ToastOptions);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      toast.error('Storage remove error:', error as ToastOptions);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      toast.error('Storage clear error:', error as ToastOptions);
    }
  },

  exists: (key: string): boolean => {
    try {
      return localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  },
};

// SessionStorage wrapper
export const sessionStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  set: (key: string, value: unknown): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      toast.error('SessionStorage set error:', error as ToastOptions);
    }
  },

  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      toast.error('SessionStorage remove error:', error as ToastOptions);
    }
  },

  clear: (): void => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      toast.error('SessionStorage clear error:', error as ToastOptions);
    }
  },
};
