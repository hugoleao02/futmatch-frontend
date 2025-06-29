import type { RegisterRequest, RegisterResponse } from '../../dtos';

export interface IRegisterUseCase {
  execute(registerRequest: RegisterRequest): Promise<RegisterResponse>;
}
