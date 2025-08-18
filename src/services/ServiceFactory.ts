import type { IApiClient, IAuthService, IParticipacaoService, IPartidaService } from '../types';
import { AuthService } from './AuthService';
import { HttpClient } from './HttpClient';
import { ParticipacaoService } from './ParticipacaoService';
import { PartidaService } from './PartidaService';

export class ServiceFactory {
  private static instance: ServiceFactory;
  private httpClient: IApiClient;
  private authService: IAuthService;
  private partidaService: IPartidaService;
  private participacaoService: IParticipacaoService;

  private constructor() {
    this.httpClient = new HttpClient();
    this.authService = new AuthService(this.httpClient);
    this.partidaService = new PartidaService(this.httpClient);
    this.participacaoService = new ParticipacaoService(this.httpClient);
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  getAuthService(): IAuthService {
    return this.authService;
  }

  getPartidaService(): IPartidaService {
    return this.partidaService;
  }

  getParticipacaoService(): IParticipacaoService {
    return this.participacaoService;
  }

  getHttpClient(): IApiClient {
    return this.httpClient;
  }

  // Método para substituir serviços (útil para testes)
  setAuthService(service: IAuthService): void {
    this.authService = service;
  }

  setPartidaService(service: IPartidaService): void {
    this.partidaService = service;
  }

  setParticipacaoService(service: IParticipacaoService): void {
    this.participacaoService = service;
  }

  setHttpClient(client: IApiClient): void {
    this.httpClient = client;
  }
}
