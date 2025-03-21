import { Partida } from "../../@types/partida/Partida";
import { HttpClient } from "../api/HttpClient";

export class PartidasService {
  static async listar(): Promise<Partida[]> {
    return await HttpClient.get("/partidas");
  }

  static async obter(id: number): Promise<Partida> {
    return await HttpClient.get(`/partidas/${id}`);
  }

  static async criar(partida: Omit<Partida, "id">): Promise<Partida> {
    return await HttpClient.post("/partidas", partida);
  }

  static async atualizar(
    id: number,
    partida: Partial<Partida>
  ): Promise<Partida> {
    return await HttpClient.put(`/partidas/${id}`, partida);
  }

  static async deletar(id: number): Promise<void> {
    await HttpClient.delete(`/partidas/${id}`);
  }
}
