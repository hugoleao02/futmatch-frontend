import type { AuthenticatedUser } from '../entities/User';

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthenticatedUser>;
  register(nome: string, email: string, password: string): Promise<AuthenticatedUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthenticatedUser | null>;
}