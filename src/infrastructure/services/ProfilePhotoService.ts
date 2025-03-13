import { FotoPerfilResponse } from "../../@types";
import { HttpClient } from "../api/HttpClient";
import { getToken } from "./TokenService";

export class ProfilePhotoService {
  private static readonly BASE_URL = "/v1/profile-photos";

  static async uploadProfilePhoto(file: File): Promise<FotoPerfilResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return HttpClient.post<FotoPerfilResponse>(this.BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteProfilePhoto(): Promise<void> {
    await HttpClient.delete(this.BASE_URL);
  }

  static async getProfilePhoto(): Promise<FotoPerfilResponse> {
    return HttpClient.get<FotoPerfilResponse>(this.BASE_URL);
  }

  static async getProfilePhotoUrl(): Promise<string> {
    const photo = await this.getProfilePhoto();
    if (!photo) return "";

    const token = getToken();
    const timestamp = new Date().getTime();
    return `${import.meta.env.VITE_API_BASE_URL}${
      this.BASE_URL
    }/image?token=${token}&t=${timestamp}`;
  }
}
