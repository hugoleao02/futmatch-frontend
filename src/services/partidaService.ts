import axios from "axios";
import { Partida, CriarPartidaDTO, AtualizarPlacarDTO } from "../types/api";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const partidaService = {
  async criarPartida(partidaData: CriarPartidaDTO): Promise<Partida> {
    const response = await api.post("/api/partidas", partidaData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async buscarPartida(id: number): Promise<Partida> {
    const response = await api.get(`/api/partidas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async listarPartidasDaSala(salaId: number): Promise<Partida[]> {
    const response = await api.get(`/api/partidas/sala/${salaId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async listarMinhasPartidas(): Promise<Partida[]> {
    const response = await api.get("/api/partidas/minhas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async listarPartidasEmAndamento(): Promise<Partida[]> {
    const response = await api.get("/api/partidas/em-andamento", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async iniciarPartida(partidaId: number): Promise<Partida> {
    const response = await api.post(
      `/api/partidas/${partidaId}/iniciar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  async finalizarPartida(partidaId: number): Promise<Partida> {
    const response = await api.post(
      `/api/partidas/${partidaId}/finalizar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  async atualizarPlacar(
    partidaId: number,
    placar: AtualizarPlacarDTO
  ): Promise<Partida> {
    const response = await api.put(
      `/api/partidas/${partidaId}/placar`,
      placar,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },
};
