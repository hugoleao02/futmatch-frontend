import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { PartidaRepositoryImpl } from '../../data/repositories/PartidaRepositoryImpl';
import { HomeUseCase } from '../../domain/usecases/HomeUseCase';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase';
import { AxiosHttpClient } from '../http/AxiosHttpClient';
import { LocalStorage } from '../storage/LocalStorage';
import type { Container } from './types';

// Infraestrutura
const httpClient = new AxiosHttpClient();
const storage = new LocalStorage();

// Repositories
const authRepository = new AuthRepositoryImpl(httpClient, storage);
const partidaRepository = new PartidaRepositoryImpl(httpClient);

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
