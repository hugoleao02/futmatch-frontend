/**
 * Texto exibido para o local da partida: nome/endereço salvo ou coordenadas.
 */
export function formatPartidaLocalizacao(
  nomeLocal: string | null | undefined,
  latitude: number | null | undefined,
  longitude: number | null | undefined
): string {
  const nome = nomeLocal?.trim();
  if (nome) return nome;
  if (latitude != null && longitude != null && !Number.isNaN(latitude) && !Number.isNaN(longitude)) {
    return `${Number(latitude).toFixed(4)}, ${Number(longitude).toFixed(4)}`;
  }
  return 'Local não informado';
}
