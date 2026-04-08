// Mapbox-free geocoding service using Nominatim (OpenStreetMap)
// No API key required. Rate limit: 1 request/second.

export interface PlaceSuggestion {
  id: string;
  display_name: string;
  latitude: number;
  longitude: number;
  short_name: string;
}

export interface GeocodingService {
  searchPlaces(query: string, userLocation?: { lat: number; lng: number }): Promise<PlaceSuggestion[]>;
  reverseGeocode(lat: number, lng: number): Promise<string | null>;
}

class NominatimService implements GeocodingService {
  private readonly BASE_URL = 'https://nominatim.openstreetmap.org';

  private timeout(ms: number) {
    return new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    );
  }

  private async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'FutMatch/1.0',
          ...options?.headers,
        },
      });
      clearTimeout(id);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  async searchPlaces(query: string, userLocation?: { lat: number; lng: number }): Promise<PlaceSuggestion[]> {
    if (!query || query.trim().length < 2) return [];
    const encoded = encodeURIComponent(query.trim());
    let url = `${this.BASE_URL}/search?q=${encoded}&format=json&limit=5&addressdetails=1&countrycodes=br&accept-language=pt-BR`;

    // Prioritizar busca no raio do usuário (viewbox de ~50km)
    if (userLocation) {
      const span = 0.45; // ~50km de raio
      const viewbox = `${userLocation.lng - span},${userLocation.lat + span},${userLocation.lng + span},${userLocation.lat - span}`;
      url += `&viewbox=${viewbox}`;
    }

    const results: Array<{
      place_id: number;
      display_name: string;
      lat: string;
      lon: string;
      type: string;
      class: string;
    }> = await Promise.race([
      this.fetch(url),
      this.timeout(8000),
    ]);

    return results.map(item => ({
      id: String(item.place_id),
      display_name: this.formatDisplayName(item.display_name),
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      short_name: this.extractShortName(item),
    }));
  }

  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    const results: { display_name: string } = await Promise.race([
      this.fetch(`${this.BASE_URL}/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`),
      this.timeout(8000),
    ]);
    return results?.display_name ?? null;
  }

  private extractShortName(item: {
    type: string;
    class: string;
    display_name: string;
    address?: Record<string, string>;
  }): string {
    const parts = this.getAddressParts(this.formatDisplayName(item.display_name));
    if (parts.length >= 2) {
      return parts.slice(0, 2).join(', ').trim();
    }
    return parts[0].trim();
  }

  /**
   * Simplifica o nome do endereo removendo partes desnecessrias como CEP,
   * pas e regies geogrficas. Retorna formato limpo:
   * "Rua Safira, Nacional - Contagem - MG"
   */
  private formatDisplayName(displayName: string): string {
    const parts = this.getAddressParts(displayName);

    const ignored = ['brasil', 'regio geogrfica'];
    const filtered = parts.filter(p => !ignored.some(ig => p.toLowerCase().startsWith(ig)));

    const filteredNoCep = filtered.filter(p => !/^\d{5}-\d{3}$/.test(p.trim()));

    let city: string | null = null;
    let state: string | null = null;
    const localParts: string[] = [];

    // Partes que costumam ser cidade/estado (2+ palavras, em posies finais)
    for (let i = filteredNoCep.length - 1; i >= 0; i--) {
      const p = filteredNoCep[i].trim();
      if (state === null && p.length <= 2) {
        // Atribuies de estado como MG, SP
        state = p.toUpperCase();
        continue;
      }
      if (city === null && !p.match(/^\d/) && p.length > 2 && localParts.length === 0) {
        city = p;
        continue;
      }
      localParts.unshift(p);
    }

    const resultParts = [...localParts.slice(0, 3)]; // rua, nmero/bairro, mx 3
    if (city) resultParts.push(city);
    if (state) resultParts.push(state);

    // Formatar: primeiras partes por vrgula, cidade-estado por hfen
    if (localParts.length > 0) {
      let result = localParts.slice(0, 2).join(', ');
      if (city) result += ` - ${city}`;
      if (state) result += ` - ${state}`;
      return result;
    }

    return filteredNoCep.join(', ');
  }

  private getAddressParts(displayName: string): string[] {
    return displayName.split(',').map(s => s.trim()).filter(Boolean);
  }
}

export const geocodingService: GeocodingService = new NominatimService();
