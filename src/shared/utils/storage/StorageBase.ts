import { toast, type ToastOptions } from 'react-toastify';

export abstract class StorageBase {
  protected abstract storage: Storage;

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  }

  set(key: string, value: unknown): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      toast.error('Storage set error:', error as ToastOptions);
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      toast.error('Storage remove error:', error as ToastOptions);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      toast.error('Storage clear error:', error as ToastOptions);
    }
  }

  exists(key: string): boolean {
    try {
      return this.storage.getItem(key) !== null;
    } catch {
      return false;
    }
  }
}
