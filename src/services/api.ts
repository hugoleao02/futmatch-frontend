import axios from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  PagePartidaResponse,
  Participacao,
  Partida,
  PartidaRequest,
  PartidaUpdateRequest,
  RegisterRequest,
  RegisterResponse,
} from '../types';

// Configuração base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Serviços de autenticação
export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Serviços de partida
export const partidaService = {
  async listarPartidas(): Promise<Partida[]> {
    const response = await api.get<Partida[]>('/partidas');
    return response.data;
  },

  async listarPartidasFuturas(page = 0, size = 10): Promise<PagePartidaResponse> {
    const response = await api.get<PagePartidaResponse>(
      `/partidas/futuras?page=${page}&size=${size}`,
    );
    return response.data;
  },

  async buscarPartidaPorId(id: number): Promise<Partida> {
    const response = await api.get<Partida>(`/partidas/${id}`);
    return response.data;
  },

  async criarPartida(data: PartidaRequest): Promise<Partida> {
    const response = await api.post<Partida>('/partidas', data);
    return response.data;
  },

  async atualizarPartida(id: number, data: PartidaUpdateRequest): Promise<Partida> {
    const response = await api.put<Partida>(`/partidas/${id}`, data);
    return response.data;
  },

  async deletarPartida(id: number): Promise<void> {
    await api.delete(`/partidas/${id}`);
  },
};

// Serviços de participação
export const participacaoService = {
  async participarPartida(partidaId: number): Promise<Participacao> {
    const response = await api.post<Participacao>(`/participacoes/partida/${partidaId}`, {});
    return response.data;
  },

  async cancelarParticipacao(partidaId: number): Promise<void> {
    await api.delete(`/participacoes/partida/${partidaId}`);
  },

  async aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    const response = await api.put<Participacao>(
      `/participacoes/partida/${partidaId}/participante/${participanteId}/aprovar`,
      {},
    );
    return response.data;
  },

  async rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao> {
    const response = await api.put<Participacao>(
      `/participacoes/partida/${partidaId}/participante/${participanteId}/rejeitar`,
      {},
    );
    return response.data;
  },
};

export default api;
