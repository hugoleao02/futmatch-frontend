import axios from "axios";
import { Partida, CriarPartidaDTO, AtualizarPlacarDTO } from "../types/api";

const API_URL = "http://localhost:8080";

export const partidaService = {
  async criarPartida(partidaData: CriarPartidaDTO): Promise<Partida> {
    const response = await axios.post(`${API_URL}/api/partidas`, partidaData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async buscarPartida(id: number): Promise<Partida> {
    const response = await axios.get(`${API_URL}/api/partidas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async listarPartidasDaSala(salaId: number): Promise<Partida[]> {
    const response = await axios.get(`${API_URL}/api/partidas/sala/${salaId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async listarMinhasPartidas(): Promise<Partida[]> {
    const response = await axios.get(`${API_URL}/api/partidas/minhas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async listarPartidasEmAndamento(): Promise<Partida[]> {
    const response = await axios.get(`${API_URL}/api/partidas/em-andamento`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async iniciarPartida(partidaId: number): Promise<Partida> {
    const response = await axios.post(
      `${API_URL}/api/partidas/${partidaId}/iniciar`,
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
    const response = await axios.post(
      `${API_URL}/api/partidas/${partidaId}/finalizar`,
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
    const response = await axios.put(
      `${API_URL}/api/partidas/${partidaId}/placar`,
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
