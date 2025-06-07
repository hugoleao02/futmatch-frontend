// Tipos base comuns
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Tipos para formulários
export interface FormFieldError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormFieldError[];
}

// Tipos para loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data?: T | null;
}

// Tipos para opções de seleção
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// Tipos para coordenadas/localização
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Tipos para filtros
export interface BaseFilter {
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Tipos utilitários
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Status genéricos
export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

// Tipos para callbacks
export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;
export type AsyncCallback<T = void> = () => Promise<T>;

// Tipos para eventos
export interface BaseEvent {
  type: string;
  timestamp: Date;
  source: string;
}

// Tipos para configuração
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
  features: Record<string, boolean>;
}
