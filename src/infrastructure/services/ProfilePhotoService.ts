import { FotoPerfilResponse } from "../../@types";
import { HttpClient } from "../api/HttpClient";
import { getToken } from "./TokenService";

export class ProfilePhotoService {
  private static readonly BASE_URL = "/v1/profile-photos";
  private static readonly CACHE_DURATION = 5 * 60 * 1000;
  private static photoCache: {
    blob: Blob;
    timestamp: number;
  } | null = null;

  static async uploadProfilePhoto(file: File): Promise<FotoPerfilResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await HttpClient.post<FotoPerfilResponse>(
        this.BASE_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.invalidateImageCache();
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProfilePhoto(): Promise<void> {
    try {
      await HttpClient.delete(this.BASE_URL);
      this.invalidateImageCache();
    } catch (error) {
      throw error;
    }
  }

  static async getProfilePhotoMetadata(): Promise<FotoPerfilResponse | null> {
    try {
      const response = await HttpClient.get<FotoPerfilResponse>(this.BASE_URL);
      return response;
    } catch (error) {
      return null;
    }
  }

  private static cacheKey = 0;

  private static invalidateImageCache() {
    this.cacheKey = Date.now();
    this.clearPhotoCache();
  }

  static getImageUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    return `${baseUrl}${this.BASE_URL}/image?v=${this.cacheKey}`;
  }

  static async getProfilePhotoBlob(): Promise<Blob | null> {
    try {
      if (this.photoCache) {
        const cacheAge = Date.now() - this.photoCache.timestamp;
        if (cacheAge < this.CACHE_DURATION) {
          return this.photoCache.blob;
        }
      }

      const token = getToken();
      if (!token) {
        return null;
      }

      const url = `${import.meta.env.VITE_API_BASE_URL}${this.BASE_URL}/image`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "image/*",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) {
          this.photoCache = null;
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.startsWith("image/")) {
        this.photoCache = null;
        return null;
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        console.error("Blob vazio recebido");
        this.photoCache = null;
        return null;
      }

      // Atualiza o cache
      this.photoCache = {
        blob,
        timestamp: Date.now(),
      };

      return blob;
    } catch (error) {
      console.error("Erro ao buscar imagem do perfil:", error);
      this.photoCache = null;
      return null;
    }
  }

  static clearPhotoCache() {
    this.photoCache = null;
  }
}
