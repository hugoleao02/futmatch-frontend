import type { RegisterRequest, RegisterResponse } from '../../types';

export interface IRegisterUseCase {
  execute(registerRequest: RegisterRequest): Promise<RegisterResponse>;
}
