import { NotificationService } from '../services/NotificationService';
import { ServiceFactory } from '../services/ServiceFactory';
import { AuthValidationService, ValidationService } from '../services/ValidationService';
import type {
  IAuthService,
  INotificationService,
  IParticipacaoService,
  IPartidaService,
} from '../types';
import type { IAuthValidator, IUserValidator } from '../types/validation';
import { SetterUtils } from '../utils/setterUtils';

// Container de injeção de dependências
export class DependencyContainer {
  private static instance: DependencyContainer;

  private serviceFactory: ServiceFactory;
  private notificationService: INotificationService;
  private validationService: IUserValidator;
  private authValidationService: IAuthValidator;

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

  getValidationService(): IUserValidator {
    return this.validationService;
  }

  getAuthValidationService(): IAuthValidator {
    return this.authValidationService;
  }

  // Métodos para substituir serviços (útil para testes)
  setNotificationService(service: INotificationService): void {
    SetterUtils.createSetter(this as any, 'notificationService', service);
  }

  setValidationService(service: IUserValidator): void {
    SetterUtils.createSetter(this as any, 'validationService', service);
  }

  setAuthValidationService(service: IAuthValidator): void {
    SetterUtils.createSetter(this as any, 'authValidationService', service);
  }
}

// Função helper para obter o container
export const getDependencyContainer = (): DependencyContainer => {
  return DependencyContainer.getInstance();
};
