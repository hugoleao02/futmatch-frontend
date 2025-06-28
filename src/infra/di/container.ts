import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { ParticipacaoRepositoryImpl } from '../../data/repositories/ParticipacaoRepositoryImpl';
import { PartidaRepositoryImpl } from '../../data/repositories/PartidaRepositoryImpl';
import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import { HomeUseCase } from '../../domain/usecases/HomeUseCase';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import { ParticipacaoUseCase } from '../../domain/usecases/ParticipacaoUseCase';
import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase';
import { AxiosHttpClient } from '../http/client/AxiosHttpClient';
import { LocalStorage } from '../storage/LocalStorage';
import type { Container as ContainerType } from './types';

export class Container implements ContainerType {
  private static instance: Container;
  private readonly httpClient: IHttpClient;
  readonly repositories: ContainerType['repositories'];
  readonly useCases: ContainerType['useCases'];

  private constructor() {
    this.httpClient = new AxiosHttpClient();
    const storage = new LocalStorage();

    // Inicializa repositórios
    this.repositories = {
      authRepository: new AuthRepositoryImpl(this.httpClient, storage),
      partidaRepository: new PartidaRepositoryImpl(this.httpClient),
      participacaoRepository: new ParticipacaoRepositoryImpl(this.httpClient),
    };

    // Inicializa use cases
    this.useCases = {
      loginUseCase: new LoginUseCase(this.repositories.authRepository),
      registerUseCase: new RegisterUseCase(this.repositories.authRepository),
      homeUseCase: new HomeUseCase(this.repositories.partidaRepository),
      participacaoUseCase: new ParticipacaoUseCase(this.repositories.participacaoRepository),
    };
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getHttpClient(): IHttpClient {
    return this.httpClient;
  }

  getRepositories(): ContainerType['repositories'] {
    return this.repositories;
  }

  getUseCases(): ContainerType['useCases'] {
    return this.useCases;
  }
}
