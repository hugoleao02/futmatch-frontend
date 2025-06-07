import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../core/usecases/LoginUseCase';
import { RegisterUseCase } from '../../core/usecases/RegisterUseCase';
import type { Container } from './types';

// Repositories
const authRepository = new AuthRepositoryImpl();

// Use Cases
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);

export const container: Container = {
  repositories: {
    authRepository,
  },
  useCases: {
    loginUseCase,
    registerUseCase,
  },
};
