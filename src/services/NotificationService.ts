import { toast } from 'react-toastify';
import type { INotificationService } from '../types';

export class NotificationService implements INotificationService {
  showSuccess(message: string): void {
    toast.success(message);
  }

  showError(message: string): void {
    toast.error(message);
  }

  showInfo(message: string): void {
    toast.info(message);
  }

  showWarning(message: string): void {
    toast.warning(message);
  }
}
