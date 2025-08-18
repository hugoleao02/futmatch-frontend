import type { LoginResponse, RegisterResponse, User } from '../types';
import { DataTransformers } from './dataTransformers';

// Transformador para dados de autenticação
export const criarUsuarioDeRespostaAuth = (resposta: LoginResponse | RegisterResponse): User => ({
  id: resposta.id,
  nome: resposta.nome,
  email: resposta.email,
});

// Transformador para estado de autenticação
export const criarEstadoAuth = (resposta: LoginResponse | RegisterResponse) => ({
  usuario: criarUsuarioDeRespostaAuth(resposta),
  token: resposta.token,
  estaAutenticado: true,
  carregando: false,
});

// Estado limpo de autenticação
export const criarEstadoAuthVazio = () => ({
  usuario: null,
  token: null,
  estaAutenticado: false,
  carregando: false,
});

// Transformadores compostos usando o utilitário genérico
export const transformarRespostaAuth = DataTransformers.composeTransformers(
  criarUsuarioDeRespostaAuth,
  (usuario: User) => ({ usuario, estaAutenticado: true, carregando: false }),
);
