import axios from "axios";
import { Sala, CriarSalaDTO } from "../types/api";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const salaService = {
  async listarSalasAtivas(): Promise<Sala[]> {
    const response = await api.get("/salas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async criarSala(salaData: CriarSalaDTO): Promise<Sala> {
    const response = await api.post("/salas", salaData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async buscarSalaPorId(id: number): Promise<Sala> {
    const response = await api.get(`/salas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async buscarPorLocalizacao(localizacao: string): Promise<Sala[]> {
    const response = await api.get("/salas/buscar", {
      params: { localizacao },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async entrarNaSala(id: number): Promise<void> {
    await api.post(
      `/salas/${id}/entrar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  async sairDaSala(id: number): Promise<void> {
    await api.post(
      `/salas/${id}/sair`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  async deletarSala(id: number): Promise<void> {
    await api.delete(`/salas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
