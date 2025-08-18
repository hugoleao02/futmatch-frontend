import { NotificationService } from '../services/NotificationService';
import { FabricaServicos } from '../services/ServiceFactory';
import { AuthValidationService, ValidationService } from '../services/ValidationService';
import type {
  INotificationService,
  IServicoAutenticacao,
  IServicoParticipacao,
  IServicoPartida,
} from '../types';
import type { IAuthValidator, IUserValidator } from '../types/validation';

// Container de injeção de dependências
export class ContainerDependencias {
  private static instancia: ContainerDependencias;

  private fabricaServicos: FabricaServicos;
  private servicoNotificacao: INotificationService;
  private servicoValidacao: IUserValidator;
  private servicoValidacaoAuth: IAuthValidator;

  private constructor() {
    this.fabricaServicos = FabricaServicos.getInstance();
    this.servicoNotificacao = new NotificationService();
    this.servicoValidacao = new ValidationService();
    this.servicoValidacaoAuth = new AuthValidationService();
  }

  static getInstance(): ContainerDependencias {
    if (!ContainerDependencias.instancia) {
      ContainerDependencias.instancia = new ContainerDependencias();
    }
    return ContainerDependencias.instancia;
  }

  // Getters para serviços
  getServicoAuth(): IServicoAutenticacao {
    return this.fabricaServicos.getServicoAuth();
  }

  getServicoPartida(): IServicoPartida {
    return this.fabricaServicos.getServicoPartida();
  }

  getServicoParticipacao(): IServicoParticipacao {
    return this.fabricaServicos.getServicoParticipacao();
  }

  getServicoNotificacao(): INotificationService {
    return this.servicoNotificacao;
  }

  getServicoValidacao(): IUserValidator {
    return this.servicoValidacao;
  }

  getServicoValidacaoAuth(): IAuthValidator {
    return this.servicoValidacaoAuth;
  }

  // Métodos para substituir serviços (útil para testes)
  setServicoNotificacao(servico: INotificationService): void {
    this.servicoNotificacao = servico;
  }

  setServicoValidacao(servico: IUserValidator): void {
    this.servicoValidacao = servico;
  }

  setServicoValidacaoAuth(servico: IAuthValidator): void {
    this.servicoValidacaoAuth = servico;
  }
}

// Função helper para obter o container
export const obterContainerDependencias = (): ContainerDependencias => {
  return ContainerDependencias.getInstance();
};
