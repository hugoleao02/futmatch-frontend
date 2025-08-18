import type { IValidator, ValidationResult } from '../types';
import type { AuthValidationData, UserValidationData } from '../types/validation';

export class ValidationService implements IValidator<UserValidationData> {
  validate(data: UserValidationData): ValidationResult {
    const errors: string[] = [];

    // Validação básica de dados obrigatórios
    if (!data) {
      errors.push('Dados são obrigatórios');
      return { isValid: false, errors };
    }

    // Validação de email
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }

    // Validação de senha
    if (data.senha && data.senha.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }

    // Validação de nome
    if (data.nome && data.nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Validador específico para formulários de autenticação
export class AuthValidationService implements IValidator<AuthValidationData> {
  validate(data: AuthValidationData): ValidationResult {
    const errors: string[] = [];

    if (!data.email) {
      errors.push('Email é obrigatório');
    } else if (!this.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }

    if (!data.senha) {
      errors.push('Senha é obrigatória');
    } else if (data.senha.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }

    // AuthValidationData não inclui nome, apenas email e senha

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
