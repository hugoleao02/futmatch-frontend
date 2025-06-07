import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { IRegisterUseCase } from './interfaces/IRegisterUseCase';
import type { RegisterResponse } from '../types/api';
import { AUTH_ERRORS } from '../constants/errors';

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(nome: string, email: string, senha: string): Promise<RegisterResponse> {
    if (!nome || !email || !senha) {
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
    }

    if (senha.length < 6) {
      throw new Error(AUTH_ERRORS.PASSWORD_MIN_LENGTH);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(AUTH_ERRORS.INVALID_EMAIL);
    }

    try {
      return await this.authRepository.register(nome, email, senha);
    } catch (error) {
      throw new Error(AUTH_ERRORS.REGISTER_ERROR);
    }
  }
}
