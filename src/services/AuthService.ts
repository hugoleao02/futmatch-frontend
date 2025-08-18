import type {
  IClienteApi,
  IServicoAutenticacao,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types';
import { ServicoBase } from './BaseService';

export class ServicoAutenticacao extends ServicoBase implements IServicoAutenticacao {
  constructor(clienteHttp: IClienteApi) {
    super(clienteHttp);
  }

  async fazerLogin(dados: LoginRequest): Promise<LoginResponse> {
    return this.lidarComRequisicao(
      () => this.clienteHttp.post<LoginResponse>('/auth/login', dados),
      'Login',
    );
  }

  async fazerRegistro(dados: RegisterRequest): Promise<RegisterResponse> {
    return this.lidarComRequisicao(
      () => this.clienteHttp.post<RegisterResponse>('/auth/register', dados),
      'Registro',
    );
  }

  fazerLogout(): void {
    // O logout agora é gerenciado pela store do Zustand
    // Este método pode ser removido se não for usado em outros lugares
  }
}
