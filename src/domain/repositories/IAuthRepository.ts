import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';

export interface IAuthRepository {
  login(loginRequest: LoginRequest): Promise<LoginResponse>;
  register(registerRequest: RegisterRequest): Promise<RegisterResponse>;
  logout(): Promise<void>;
}
