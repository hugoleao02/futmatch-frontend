import type {
  IClienteApi,
  IServicoAutenticacao,
  IServicoParticipacao,
  IServicoPartida,
} from '../types';
import { ServicoAutenticacao } from './AuthService';
import { HttpClient } from './HttpClient';
import { ParticipacaoService } from './ParticipacaoService';
import { PartidaService } from './PartidaService';

export class FabricaServicos {
  private static instancia: FabricaServicos;
  private clienteHttp: IClienteApi;
  private servicoAuth: IServicoAutenticacao;
  private servicoPartida: IServicoPartida;
  private servicoParticipacao: IServicoParticipacao;

  private constructor() {
    this.clienteHttp = new HttpClient();
    this.servicoAuth = new ServicoAutenticacao(this.clienteHttp);
    this.servicoPartida = new PartidaService(this.clienteHttp);
    this.servicoParticipacao = new ParticipacaoService(this.clienteHttp);
  }

  static getInstance(): FabricaServicos {
    if (!FabricaServicos.instancia) {
      FabricaServicos.instancia = new FabricaServicos();
    }
    return FabricaServicos.instancia;
  }

  getServicoAuth(): IServicoAutenticacao {
    return this.servicoAuth;
  }

  getServicoPartida(): IServicoPartida {
    return this.servicoPartida;
  }

  getServicoParticipacao(): IServicoParticipacao {
    return this.servicoParticipacao;
  }

  getClienteHttp(): IClienteApi {
    return this.clienteHttp;
  }

  // Método para substituir serviços (útil para testes)
  setServicoAuth(servico: IServicoAutenticacao): void {
    this.servicoAuth = servico;
  }

  setServicoPartida(servico: IServicoPartida): void {
    this.servicoPartida = servico;
  }

  setServicoParticipacao(servico: IServicoParticipacao): void {
    this.servicoParticipacao = servico;
  }

  setClienteHttp(cliente: IClienteApi): void {
    this.clienteHttp = cliente;
  }
}
