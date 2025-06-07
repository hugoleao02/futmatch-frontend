import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { ILoginUseCase } from './interfaces/ILoginUseCase';
import type { LoginResponse } from '../types/api';
import { AUTH_ERRORS } from '../constants/errors';

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, senha: string): Promise<LoginResponse> {
    if (!email || !senha) {
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(AUTH_ERRORS.INVALID_EMAIL);
    }

    try {
      return await this.authRepository.login(email, senha);
    } catch (error) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
  }
}
