import { isRequired, isValidEmail } from '../../shared/utils/validation';
import { AUTH_ERRORS } from '../constants/errors';
import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { LoginResponse } from '../types/api';
import type { ILoginUseCase } from './interfaces/ILoginUseCase';

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, senha: string): Promise<LoginResponse> {
    if (!isRequired(email) || !isRequired(senha)) {
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
    }

    if (!isValidEmail(email)) {
      throw new Error(AUTH_ERRORS.INVALID_EMAIL);
    }

    try {
      return await this.authRepository.login(email, senha);
    } catch (_error) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
  }
}
