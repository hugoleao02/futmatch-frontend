import { toast } from 'react-toastify';
import { create } from 'zustand';

export type ErrorType = 'AUTH' | 'NETWORK' | 'VALIDATION' | 'SERVER' | 'UNKNOWN';

export interface ErrorState {
  id: string;
  type: ErrorType;
  message: string;
  details?: string;
  timestamp: Date;
  handled: boolean;
}

interface ErrorStoreState {
  // Estado
  errors: ErrorState[];
  currentError: ErrorState | null;
  isLoading: boolean;

  // Ações
  addError: (error: Omit<ErrorState, 'id' | 'timestamp' | 'handled'>) => void;
  clearError: (errorId: string) => void;
  clearAllErrors: () => void;
  markAsHandled: (errorId: string) => void;
  setLoading: (loading: boolean) => void;

  // Utilitários
  hasErrors: () => boolean;
  getUnhandledErrors: () => ErrorState[];
}

export const useErrorStore = create<ErrorStoreState>((set, get) => ({
  // Estado inicial
  errors: [],
  currentError: null,
  isLoading: false,

  // Ações
  addError: errorData => {
    const newError: ErrorState = {
      ...errorData,
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      handled: false,
    };

    set(state => ({
      errors: [...state.errors, newError],
      currentError: newError,
    }));

    // Mostrar toast baseado no tipo de erro
    const toastType = getToastType(errorData.type);
    toast[toastType](errorData.message, {
      toastId: newError.id,
      autoClose: getToastAutoClose(errorData.type),
    });
  },

  clearError: errorId => {
    set(state => ({
      errors: state.errors.filter(error => error.id !== errorId),
      currentError: state.currentError?.id === errorId ? null : state.currentError,
    }));
  },

  clearAllErrors: () => {
    set({
      errors: [],
      currentError: null,
    });
  },

  markAsHandled: errorId => {
    set(state => ({
      errors: state.errors.map(error =>
        error.id === errorId ? { ...error, handled: true } : error,
      ),
    }));
  },

  setLoading: loading => {
    set({ isLoading: loading });
  },

  // Utilitários
  hasErrors: () => {
    return get().errors.length > 0;
  },

  getUnhandledErrors: () => {
    return get().errors.filter(error => !error.handled);
  },
}));

// Funções auxiliares para determinar tipo de toast
const getToastType = (errorType: ErrorType): 'error' | 'warning' | 'info' => {
  switch (errorType) {
    case 'AUTH':
      return 'error';
    case 'NETWORK':
      return 'warning';
    case 'VALIDATION':
      return 'warning';
    case 'SERVER':
      return 'error';
    case 'UNKNOWN':
      return 'error';
    default:
      return 'error';
  }
};

const getToastAutoClose = (errorType: ErrorType): number | false => {
  switch (errorType) {
    case 'AUTH':
      return 5000; // 5 segundos
    case 'NETWORK':
      return 8000; // 8 segundos
    case 'VALIDATION':
      return 4000; // 4 segundos
    case 'SERVER':
      return 6000; // 6 segundos
    case 'UNKNOWN':
      return 5000; // 5 segundos
    default:
      return 5000;
  }
};
