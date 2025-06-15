import { isRequired, isValidEmail } from '../../shared/utils';
import { AUTH_ERRORS } from '../constants/errors';
import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { LoginRequest, LoginResponse } from '../types';
import type { ILoginUseCase } from './interfaces/ILoginUseCase';

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(loginRequest: LoginRequest): Promise<LoginResponse> {
    if (!isRequired(loginRequest.email) || !isRequired(loginRequest.senha))
      throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);

    if (!isValidEmail(loginRequest.email)) throw new Error(AUTH_ERRORS.INVALID_EMAIL);

    try {
      return await this.authRepository.login(loginRequest);
    } catch (_error) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
  }
}
