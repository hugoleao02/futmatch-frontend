import type { LoginRequest, LoginResponse } from '../../dtos';

export interface ILoginUseCase {
  execute(loginRequest: LoginRequest): Promise<LoginResponse>;
}
