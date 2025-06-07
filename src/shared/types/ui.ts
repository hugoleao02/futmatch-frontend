import type { ReactNode } from 'react';

// Tamanhos componentes
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Variantes de componentes
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Cores do tema
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'text'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

// Breakpoints
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Props base para componentes
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  testId?: string;
  children?: ReactNode;
}

// Props para componentes com loading
export interface LoadingComponentProps {
  isLoading?: boolean;
  loadingText?: string;
  skeleton?: boolean;
}

// Props para componentes com error
export interface ErrorComponentProps {
  error?: string | null;
  onRetry?: () => void;
}

// Props para botões
export interface ButtonProps extends BaseComponentProps {
  variant?: Variant | 'outline' | 'ghost' | 'link';
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

// Props para inputs
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// Props para select
export interface SelectProps<T = string> extends BaseComponentProps {
  options: UISelectOption<T>[];
  value?: T;
  defaultValue?: T;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  onChange?: (value: T | T[]) => void;
}

export interface UISelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
}

// Props para modal
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: Size | 'auto';
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  footer?: ReactNode;
  destroyOnClose?: boolean;
}

// Props para tooltip
export interface TooltipProps extends BaseComponentProps {
  title: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  disabled?: boolean;
}

// Props para notificação
export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Props para card
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  cover?: string;
  hoverable?: boolean;
  loading?: boolean;
  actions?: ReactNode[];
  extra?: ReactNode;
  bodyStyle?: React.CSSProperties;
}

// Props para formulário
export interface FormProps extends BaseComponentProps {
  layout?: 'vertical' | 'horizontal' | 'inline';
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
}

// Props para grid
export interface GridProps extends BaseComponentProps {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  columns?: number;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
}

// Estados de UI
export interface UIState {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  notifications: NotificationState[];
  loading: Record<string, boolean>;
  errors: Record<string, string>;
}

export interface NotificationState extends NotificationProps {
  id: string;
  timestamp: Date;
}

// Tipos para animações
export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Tipos para responsive design
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Layout props
export interface LayoutProps extends BaseComponentProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}
