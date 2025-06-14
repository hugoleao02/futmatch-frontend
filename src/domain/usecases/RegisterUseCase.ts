import { isRequired, isValidEmail, isValidPassword } from '../../shared/utils/validation';
import { AUTH_ERRORS } from '../constants/errors';
import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { RegisterResponse } from '../types/api';
import type { IRegisterUseCase } from './interfaces/IRegisterUseCase';

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(nome: string, email: string, senha: string): Promise<RegisterResponse> {
    if (!isRequired(nome) || !isRequired(email) || !isRequired(senha)) {
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
    }

    if (!isValidPassword(senha)) {
      throw new Error(AUTH_ERRORS.PASSWORD_MIN_LENGTH);
    }

    if (!isValidEmail(email)) {
      throw new Error(AUTH_ERRORS.INVALID_EMAIL);
    }

    try {
      return await this.authRepository.register(nome, email, senha);
    } catch (_error) {
      throw new Error(AUTH_ERRORS.REGISTER_ERROR);
    }
  }
}
