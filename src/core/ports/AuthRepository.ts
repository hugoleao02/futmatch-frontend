import type { User } from '../entities/User';

export interface AuthRepository {
  login(email: string, password: string): Promise<{ user: User; token: string }>;
  register(name: string, email: string, password: string): Promise<User>;
} 