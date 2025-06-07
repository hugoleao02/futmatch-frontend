import { HomeUseCase } from '../../core/usecases/HomeUseCase';
import { LoginUseCase } from '../../core/usecases/LoginUseCase';
import { RegisterUseCase } from '../../core/usecases/RegisterUseCase';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import type { Container } from './types';

// Repositories
const authRepository = new AuthRepositoryImpl();

// Use Cases
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const homeUseCase = new HomeUseCase();

export const container: Container = {
  repositories: {
    authRepository,
  },
  useCases: {
    loginUseCase,
    registerUseCase,
    homeUseCase,
  },
};
