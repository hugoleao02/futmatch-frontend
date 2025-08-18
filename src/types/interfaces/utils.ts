// Interfaces para tratamento de erros
export interface IErrorHandler {
  handleError(error: unknown, context: string): void;
  classifyError(error: unknown): ErrorInfo;
}

// Interfaces para notificações
export interface INotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
  showInfo(message: string): void;
  showWarning(message: string): void;
}

// Interfaces para armazenamento
export interface IStorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

// Interfaces para validação
export interface IValidator<T> {
  validate(data: T): ValidationResult;
}

// Interfaces para roteamento
export interface IRouteGuard {
  canActivate(): boolean;
  redirectTo(): string;
}

// Interfaces para componentes
export interface IComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Tipos auxiliares
export interface ErrorInfo {
  message: string;
  status: number;
  type: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
