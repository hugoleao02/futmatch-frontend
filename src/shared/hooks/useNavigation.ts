import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateWithToast = useCallback(
    (path: string, message: string, type: ToastType = 'info') => {
      toast[type](message);
      navigate(path);
    },
    [navigate],
  );

  return { navigateWithToast, navigate };
};
