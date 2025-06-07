// Validação de email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de senha
export const isValidPassword = (password: string): boolean => {
  // Mínimo 6 caracteres
  return password.length >= 6;
};

// Validação de senha forte
export const isStrongPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, uma maiúscula, uma minúscula, um número
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

// Validação de telefone brasileiro
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Validação de CPF
export const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

// Validação de URL
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validação de campo obrigatório
export const isRequired = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value != null && value !== '';
};

// Validação de comprimento mínimo
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

// Validação de comprimento máximo
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

// Validação de número
export const isValidNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && isFinite(Number(value));
};

// Validação de número inteiro
export const isValidInteger = (value: string): boolean => {
  return Number.isInteger(Number(value));
};

// Validação de faixa de valores
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// Validação de data
export const isValidDate = (date: string | Date): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

// Validação de data futura
export const isFutureDate = (date: string | Date): boolean => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj > now;
};

// Validação de data passada
export const isPastDate = (date: string | Date): boolean => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj < now;
};

// Schema de validação genérico
export interface ValidationRule<T = string> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => boolean | string;
  message?: string;
}

export interface ValidationSchema {
  [field: string]: ValidationRule;
}

// Use types from common
import type { ValidationResult as CommonValidationResult, FormFieldError } from '../types/common';

export type ValidationError = FormFieldError;
export type ValidationResult = CommonValidationResult;

// Função de validação genérica
export const validateField = (
  value: string,
  rule: ValidationRule,
  fieldName: string,
): ValidationError | null => {
  // Required
  if (rule.required && !isRequired(value)) {
    return {
      field: fieldName,
      message: rule.message || `${fieldName} é obrigatório`,
    };
  }

  // Skip other validations if value is empty and not required
  if (!rule.required && !value) {
    return null;
  }

  // Min length
  if (rule.minLength && !hasMinLength(value, rule.minLength)) {
    return {
      field: fieldName,
      message: rule.message || `${fieldName} deve ter pelo menos ${rule.minLength} caracteres`,
    };
  }

  // Max length
  if (rule.maxLength && !hasMaxLength(value, rule.maxLength)) {
    return {
      field: fieldName,
      message: rule.message || `${fieldName} deve ter no máximo ${rule.maxLength} caracteres`,
    };
  }

  // Pattern
  if (rule.pattern && !rule.pattern.test(value)) {
    return {
      field: fieldName,
      message: rule.message || `${fieldName} tem formato inválido`,
    };
  }

  // Custom validation
  if (rule.custom) {
    const customResult = rule.custom(value);
    if (typeof customResult === 'string') {
      return {
        field: fieldName,
        message: customResult,
      };
    }
    if (!customResult) {
      return {
        field: fieldName,
        message: rule.message || `${fieldName} é inválido`,
      };
    }
  }

  return null;
};

// Validação de objeto completo
export const validateObject = (
  data: Record<string, string>,
  schema: ValidationSchema,
): ValidationResult => {
  const errors: ValidationError[] = [];

  for (const [field, rule] of Object.entries(schema)) {
    const value = data[field] || '';
    const error = validateField(value, rule, field);
    if (error) {
      errors.push(error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
