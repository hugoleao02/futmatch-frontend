import { AUTH_ERRORS } from '@domain/constants/errors';
import type { IAuthRepository } from '@domain/repositories/IAuthRepository';
import type { LoginResponse } from '@domain/types/api';
import { isRequired, isValidEmail } from '@shared/utils/validation';
import type { ILoginUseCase } from './interfaces/ILoginUseCase';

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, senha: string): Promise<LoginResponse> {
    this.validateInput(email, senha);

    try {
      return await this.authRepository.login(email, senha);
    } catch (error) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
  }

  private validateInput(email: string, senha: string): void {
    if (!isRequired(email) || !isRequired(senha)) {
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
    }

    if (!isValidEmail(email)) {
      throw new Error(AUTH_ERRORS.INVALID_EMAIL);
    }
  }
}
