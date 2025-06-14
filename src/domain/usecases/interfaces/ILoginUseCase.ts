import type { LoginRequest, LoginResponse } from '../../types';

export interface ILoginUseCase {
  execute(loginRequest: LoginRequest): Promise<LoginResponse>;
}
