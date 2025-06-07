import type { User } from '../entities/User';

export interface AuthRepository {
  login(email: string, senha: string): Promise<{ user: User; token: string }>;
  register(name: string, email: string, senha: string): Promise<User>;
}
