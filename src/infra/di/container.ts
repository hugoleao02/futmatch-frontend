import { HomeUseCase } from '../../core/usecases/HomeUseCase';
import { LoginUseCase } from '../../core/usecases/LoginUseCase';
import { RegisterUseCase } from '../../core/usecases/RegisterUseCase';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { PartidaRepositoryImpl } from '../../data/repositories/PartidaRepositoryImpl';
import type { Container } from './types';

// Repositories
const authRepository = new AuthRepositoryImpl();
const partidaRepository = new PartidaRepositoryImpl();

// Use Cases
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const homeUseCase = new HomeUseCase(partidaRepository);

export const container: Container = {
  repositories: {
    authRepository,
    partidaRepository,
  },
  useCases: {
    loginUseCase,
    registerUseCase,
    homeUseCase,
  },
};
