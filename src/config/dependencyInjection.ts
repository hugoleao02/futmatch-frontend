import { NotificationService } from '../services/NotificationService';
import { ServiceFactory } from '../services/ServiceFactory';
import { AuthValidationService, ValidationService } from '../services/ValidationService';
import type {
  IAuthService,
  INotificationService,
  IParticipacaoService,
  IPartidaService,
  IValidator,
} from '../types';

// Container de injeção de dependências
export class DependencyContainer {
  private static instance: DependencyContainer;

  private serviceFactory: ServiceFactory;
  private notificationService: INotificationService;
  private validationService: IValidator<any>;
  private authValidationService: IValidator<any>;

  private constructor() {
    this.serviceFactory = ServiceFactory.getInstance();
    this.notificationService = new NotificationService();
    this.validationService = new ValidationService();
    this.authValidationService = new AuthValidationService();
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  // Getters para serviços
  getAuthService(): IAuthService {
    return this.serviceFactory.getAuthService();
  }

  getPartidaService(): IPartidaService {
    return this.serviceFactory.getPartidaService();
  }

  getParticipacaoService(): IParticipacaoService {
    return this.serviceFactory.getParticipacaoService();
  }

  getNotificationService(): INotificationService {
    return this.notificationService;
  }

  getValidationService(): IValidator<any> {
    return this.validationService;
  }

  getAuthValidationService(): IValidator<any> {
    return this.authValidationService;
  }

  // Métodos para substituir serviços (útil para testes)
  setNotificationService(service: INotificationService): void {
    this.notificationService = service;
  }

  setValidationService(service: IValidator<any>): void {
    this.validationService = service;
  }

  setAuthValidationService(service: IValidator<any>): void {
    this.authValidationService = service;
  }
}

// Função helper para obter o container
export const getDependencyContainer = (): DependencyContainer => {
  return DependencyContainer.getInstance();
};
