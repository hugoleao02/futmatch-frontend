import type { User } from '../entities/User';

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
