import type { IValidator, ValidationResult } from './interfaces';

// Tipos específicos para validação
export interface UserValidationData {
  nome?: string;
  email?: string;
  senha?: string;
}

export interface AuthValidationData {
  email: string;
  senha: string;
}

export interface PartidaValidationData {
  titulo?: string;
  descricao?: string;
  data?: string;
  local?: string;
}

// Validadores específicos
export interface IUserValidator extends IValidator<UserValidationData> {}
export interface IAuthValidator extends IValidator<AuthValidationData> {}
export interface IPartidaValidator extends IValidator<PartidaValidationData> {}

// Resultados de validação específicos
export interface UserValidationResult extends ValidationResult {
  nomeErrors?: string[];
  emailErrors?: string[];
  senhaErrors?: string[];
}

export interface AuthValidationResult extends ValidationResult {
  emailErrors?: string[];
  senhaErrors?: string[];
}
