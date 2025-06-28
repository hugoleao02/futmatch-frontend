// Tipos auxiliares centralizados para entidades do domínio

/**
 * Representa uma localização geográfica detalhada.
 */
export interface Localizacao {
  latitude: number;
  longitude: number;
  endereco?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
}

/**
 * Representa um criador ou usuário simplificado.
 */
export interface Criador {
  id: string;
  nome: string;
  avatar?: string;
}
