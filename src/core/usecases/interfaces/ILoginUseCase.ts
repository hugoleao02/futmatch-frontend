import type { LoginResponse } from '../../types/api';

export interface ILoginUseCase {
  execute(email: string, senha: string): Promise<LoginResponse>;
}
