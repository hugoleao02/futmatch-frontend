import type { RegisterResponse } from '../../types/api';

export interface IRegisterUseCase {
  execute(nome: string, email: string, senha: string): Promise<RegisterResponse>;
}
