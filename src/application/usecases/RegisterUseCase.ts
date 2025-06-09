import { AUTH_ERRORS } from '@domain/constants/errors';
import type { IAuthRepository } from '@domain/repositories/IAuthRepository';
import type { RegisterResponse } from '@domain/types/api';
import { isRequired, isValidEmail, isValidPassword } from '@shared/utils/validation';
import type { IRegisterUseCase } from './interfaces/IRegisterUseCase';

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(nome: string, email: string, senha: string): Promise<RegisterResponse> {
    this.validateInput(nome, email, senha);

    try {
      return await this.authRepository.register({ nome, email, senha });
    } catch (error) {
      throw new Error(AUTH_ERRORS.EMAIL_ALREADY_EXISTS);
    }
  }

  private validateInput(nome: string, email: string, senha: string): void {
    if (!isRequired(nome) || !isRequired(email) || !isRequired(senha)) {
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
    }

    if (!isValidPassword(senha)) {
      throw new Error(AUTH_ERRORS.PASSWORD_TOO_WEAK);
    }

    if (!isValidEmail(email)) {
      throw new Error(AUTH_ERRORS.INVALID_EMAIL);
    }
  }
}
