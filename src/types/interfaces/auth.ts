import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../auth';
import type { User } from '../user';

// Interfaces para autenticação
export interface IAutenticador {
  fazerLogin(credenciais: CredenciaisLogin): Promise<ResultadoAutenticacao>;
  fazerRegistro(dadosUsuario: RegistroUsuario): Promise<ResultadoAutenticacao>;
  fazerLogout(): void;
  validarToken(token: string): Promise<boolean>;
}

export interface IEstadoAutenticacao {
  usuario: User | null;
  token: string | null;
  estaAutenticado: boolean;
  carregando: boolean;
}

export interface IAcoesAutenticacao {
  definirCarregando(carregando: boolean): void;
  limparAutenticacao(): void;
}

export interface IServicoAutenticacao {
  fazerLogin(dados: LoginRequest): Promise<LoginResponse>;
  fazerRegistro(dados: RegisterRequest): Promise<RegisterResponse>;
  fazerLogout(): void;
}

// Tipos auxiliares para autenticação
export interface CredenciaisLogin {
  email: string;
  senha: string;
}

export interface RegistroUsuario {
  nome: string;
  email: string;
  senha: string;
}

export interface ResultadoAutenticacao {
  usuario: User;
  token: string;
}
