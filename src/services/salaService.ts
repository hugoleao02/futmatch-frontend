import axios from "axios";
import { Sala, CriarSalaDTO } from "../types/api";

const API_URL = "http://localhost:8080";

export const salaService = {
  async listarSalasAtivas(): Promise<Sala[]> {
    const response = await axios.get(`${API_URL}/salas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async criarSala(salaData: CriarSalaDTO): Promise<Sala> {
    const response = await axios.post(`${API_URL}/salas`, salaData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async buscarSalaPorId(id: number): Promise<Sala> {
    const response = await axios.get(`${API_URL}/salas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async buscarPorLocalizacao(localizacao: string): Promise<Sala[]> {
    const response = await axios.get(`${API_URL}/salas/buscar`, {
      params: { localizacao },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async entrarNaSala(id: number): Promise<void> {
    await axios.post(
      `${API_URL}/salas/${id}/entrar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  async sairDaSala(id: number): Promise<void> {
    await axios.post(
      `${API_URL}/salas/${id}/sair`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  async deletarSala(id: number): Promise<void> {
    await axios.delete(`${API_URL}/salas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
