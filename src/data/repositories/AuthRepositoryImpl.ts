import type { AuthRepository } from '../../core/ports/AuthRepository';
import type { User } from '../../core/entities/User';
import { api } from '../../infra/http/api';

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/login', { email, password });
    return response.data;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const response = await api.post('/register', { name, email, password });
    return response.data;
  }
} 