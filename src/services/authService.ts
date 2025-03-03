import axios from "axios";
import { CriarJogadorDTO, LoginDTO, Jogador } from "../types/api";

const API_URL = "http://localhost:8080";

export const authService = {
  async login(credentials: LoginDTO): Promise<string> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async register(userData: CriarJogadorDTO): Promise<Jogador> {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  async getProfile(): Promise<Jogador> {
    const response = await axios.get(`${API_URL}/api/jogadores/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
};
