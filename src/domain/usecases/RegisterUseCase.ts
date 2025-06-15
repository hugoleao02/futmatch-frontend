import { isRequired, isValidEmail, isValidPassword } from '../../shared/utils';
import { AUTH_ERRORS } from '../constants/errors';
import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { RegisterRequest, RegisterResponse } from '../types';
import type { IRegisterUseCase } from './interfaces/IRegisterUseCase';

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(registerRequest: RegisterRequest): Promise<RegisterResponse> {
    if (
      !isRequired(registerRequest.nome) ||
      !isRequired(registerRequest.email) ||
      !isRequired(registerRequest.senha)
    )
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);

    if (!isValidPassword(registerRequest.senha)) throw new Error(AUTH_ERRORS.PASSWORD_MIN_LENGTH);

    if (!isValidEmail(registerRequest.email)) throw new Error(AUTH_ERRORS.INVALID_EMAIL);

    try {
      return await this.authRepository.register(registerRequest);
    } catch (_error) {
      throw new Error(AUTH_ERRORS.REGISTER_ERROR);
    }
  }
}
