import { Partida } from "../../@types/partida/Partida";
import { api } from "../api";

export class PartidasService {
  static async listar(): Promise<Partida[]> {
    const response = await api.get("/partidas");
    return response.data;
  }

  static async obter(id: number): Promise<Partida> {
    const response = await api.get(`/partidas/${id}`);
    return response.data;
  }

  static async criar(partida: Omit<Partida, "id">): Promise<Partida> {
    const response = await api.post("/partidas", partida);
    return response.data;
  }

  static async atualizar(
    id: number,
    partida: Partial<Partida>
  ): Promise<Partida> {
    const response = await api.put(`/partidas/${id}`, partida);
    return response.data;
  }

  static async deletar(id: number): Promise<void> {
    await api.delete(`/partidas/${id}`);
  }
}
